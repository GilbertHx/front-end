import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllAssessmentQuestions, fetchSingleAssessmentQuestions, updateQuestionStatusQuestion, assessmentMarkCreate, createAssessmentQuestionEssayResponse } from '../actions/assessment_actions';
import { reset, Field, reduxForm } from 'redux-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
            {...input} 
            onChange={input.onChange}
            onBlur={input.onBlur}/> {label}
          <span className="checkmark" ></span>
        </label>
      </div>
    );

const renderField = ({
        input,
        label,
        type,
        meta: { touched, error }
      }) => (
        <div className="form-group">
          {/* <label>{label}</label> */}
          <div>
            <input 
                className="form-control"
                {...input} placeholder={label} type={type} />
            {touched && error && <span className="text-danger">{error}</span>}
          </div>
        </div>
      );
    
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5,  false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
    ],
    };

function renderQuill({ input }) {
    
    return (
        <ReactQuill
        theme="snow"
        modules={modules}
        {...input}
        onChange={(newValue, delta, source) => {
            if (source === 'user') {
            input.onChange(newValue);
            }
        }}
        onBlur={(range, source, quill) => {
            input.onBlur(quill.getHTML());
        }}
        />
    );
    }

class AssessmentQuestion extends Component {
    componentDidMount() {
        const { assessment_id } = this.props;
        // this.props.fetchAllAssessmentQuestions();
        this.props.fetchSingleAssessmentQuestions(assessment_id)
    }

    state = {
        answer_fiels: ""
    }

    onSubmit(question_id, values) {
        let r = []
        for (let [k, v] of Object.entries(values)) {
            r.push({label: k, correct: v})
        }

        console.log(values);

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

        console.log(completed)
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
                <div key={response.id} className="form-group">
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
                    name="title"
                    type="text"
                    component={renderField}
                    label="Essay Title"
                />
                <div className="form-group"> 
                    <div>
                        <Field
                            name="essay"
                            component={renderQuill}
                        />
                    </div>
                </div>
            </div>
        );
    }

    Rand(NewDictionary) {
        const keys = Object.keys(NewDictionary);
        let i = keys.length;
        const j = Math.floor(Math.random() * i);
        console.log("Rand Called");
        return NewDictionary[keys[j]];
    }

    renderQuestion(){
        const { assessmentQuestions } = this.props
        
        console.log(assessmentQuestions)
        const question = this.Rand(assessmentQuestions);
        const { handleSubmit, pristine, submitting } = this.props
        if (!question) {
            return <div>Loading..</div>
        }
        
        return (
            <div className="published-question-area" key={question.id}>
                <h6 className="question-label">{question.label}</h6>
                {
                    question.is_essay === false ?
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this, question.id))}>
                        <ul>
                            {this.renderAnswers(question.responses)}
                        </ul>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                        </div>
                    </form> :
                    <form onSubmit={handleSubmit(this.onEssaySubmit.bind(this, question.id))}>
                        <ul className="essay-padding">
                            {this.renderEssaySubmit()}
                        </ul>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                        </div>
                    </form>
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderQuestion()}
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.essay) {
      errors.essay = 'Required'
    }
    if (!values.title) {
        errors.title = 'Required'
      }
    return errors
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
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProprs, { fetchAllAssessmentQuestions, fetchSingleAssessmentQuestions, updateQuestionStatusQuestion, assessmentMarkCreate, createAssessmentQuestionEssayResponse })(AssessmentQuestion)
);