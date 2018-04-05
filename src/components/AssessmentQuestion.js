import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllAssessmentQuestions, fetchSingleAssessmentQuestions, updateQuestionStatusQuestion, assessmentMarkCreate, createAssessmentQuestionEssayResponse } from '../actions/assessment_actions';
import { reset, Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

const Checkbox = ({ 
    input, label, disabled 
    }) => (
      <div className="form-group">
        <label className="mt-checkbox quiz-label">
          <input 
            className="checkbox"
            type="checkbox" 
            disabled={disabled} 
            checked={input.value} 
            {...input} /> {label}
          <span className="checkmark" ></span>
        </label>
      </div>
    );

const renderDropzoneInput = (field) => {
        const files = field.input.value;
        return (
          <div className="form-group">
            {/* <label>Audio</label> */}
            <Dropzone
              className="form-control"
              name={field.name}
              onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
              <div>Try dropping your essay here, or click to select one to upload.</div>
            </Dropzone>
            {field.meta.touched &&
              field.meta.error &&
              <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
              <ul>
                { files.map((file, i) => <li key={i}>{file.name}</li>) }
              </ul>
            )}
          </div>
        );
      }

class AssessmentQuestion extends Component {
    componentDidMount() {
        const { assessment_id } = this.props;
        // this.props.fetchAllAssessmentQuestions();
        this.props.fetchSingleAssessmentQuestions(assessment_id)
    }

    onSubmit(question_id, values) {
        let r = []
        for (let [k, v] of Object.entries(values)) {
            r.push({label: k, correct: v})
        }

        let _correct_answers = this.props.assessmentQuestions[question_id].responses
        let _submitted_answers = r

        var submitted_answers = _submitted_answers.filter(function(submitted_answer){
            return submitted_answer.correct === true
        })
        var correct_answers = _correct_answers.filter(function(correct_answer){
            return correct_answer.correct === true
        })

        let completed = null
        let quiz_completed_succefully = []

        if(correct_answers.length !== submitted_answers.length) {
            completed = false
        } else {
            _correct_answers.forEach(function (correct_answer){
                if(correct_answer.correct === true){
                    _submitted_answers.filter(function (submitted_answer){
                        if(submitted_answer.label === correct_answer.label){
                            quiz_completed_succefully.push(submitted_answer.correct === correct_answer.correct)
                        }
                    })
                } else if(correct_answer.correct === false){
                    _submitted_answers.filter(function (submitted_answer){
                        if(submitted_answer.label === correct_answer.label){
                            if(submitted_answer.correct === true) {
                                quiz_completed_succefully.push(false)
                            } else if (submitted_answer.correct === false) {
                                quiz_completed_succefully.push(true)
                            } else {
                                quiz_completed_succefully.push(false)
                            }
                        }
                    })
                }
            })
            if(quiz_completed_succefully.includes(false)){
                completed = false
            } else {
                completed = true
            }
        }

        this.props.updateQuestionStatusQuestion(completed, true, question_id)
        this.props.assessmentMarkCreate(this.props.assessment_id)
    }
    onEssaySubmit(question_id, values) {
        this.props.updateQuestionStatusQuestion(false, true, question_id)
        this.props.createAssessmentQuestionEssayResponse(values, question_id)
    }

    renderAnswers(responses){
        return _.map(responses, (response) => {
            return(
                <div key={response.id}>
                    <Field
                        name={response.label}
                        label={response.label}
                        disabled={this.props.disableCompleted}
                        component={Checkbox}
                        />
                </div>
            );
        });
    }

    renderEssaySubmit() {
        return(
            <div>
                <Field
                    name="essay"
                    component={renderDropzoneInput}
                />
            </div>
        );
    }

    renderQuestion(){
        const { assessmentQuestions } = this.props
        if (assessmentQuestions[Object.keys(assessmentQuestions)[0]]) {
            const question = assessmentQuestions[Object.keys(assessmentQuestions)[0]]
            const { handleSubmit, pristine, submitting } = this.props
            return (
                <div className="published-question-area" key={question.id}>
                    <h6>{question.label}</h6>
                    {
                        question.responses.length > 0 ?
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this, question.id))}>
                            <ul>
                                {this.renderAnswers(question.responses)}
                            </ul>
                            <div className="right-algn">
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                            </div>
                        </form> :
                        <form onSubmit={handleSubmit(this.onEssaySubmit.bind(this, question.id))}>
                            <ul>
                                {this.renderEssaySubmit()}
                            </ul>
                            <div className="right-algn">
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                            </div>
                        </form>

                    }
                    
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderQuestion()}
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        assessmentQuestions: state.assessmentQuestions
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('checkboxassessment'));

export default reduxForm({
    form: 'checkboxassessment',
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProprs, { fetchAllAssessmentQuestions, fetchSingleAssessmentQuestions, updateQuestionStatusQuestion, assessmentMarkCreate, createAssessmentQuestionEssayResponse })(AssessmentQuestion)
);