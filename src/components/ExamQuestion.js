import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, updateQuestionStatusQuestion, examMarkCreate } from '../actions/exam_actions';
import { reset, Field, reduxForm } from 'redux-form';


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

class ExamQuestion extends Component {
    componentDidMount() {
        this.props.fetchQuestions();
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

    onSubmit(question_id, values) {
        let r = []
        for (let [k, v] of Object.entries(values)) {
            r.push({label: k, correct: v})
        }

        let _correct_answers = this.props.questions[question_id].responses
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
        this.props.examMarkCreate(this.props.exam_id)
    }

    renderQuestion(){
        const { questions } = this.props
        if (questions[Object.keys(questions)[0]]){
            const question = questions[Object.keys(questions)[0]]
            const { handleSubmit, pristine, submitting } = this.props
            return(
                <div className="published-question-area" key={question.id}>
                    <h6>{question.label}</h6>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this, question.id))}>
                        <ul>
                            {this.renderAnswers(question.responses)}
                        </ul>
                        <div className="right-algn">
                            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                        </div>
                    </form>
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
        questions: state.questions
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('checkboxexam'));

export default reduxForm({
    form: 'checkboxexam',
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProprs, { fetchQuestions, updateQuestionStatusQuestion, examMarkCreate })(ExamQuestion)
);
