import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    quizCompleteOperation, fetchQuizzesCompleted 
   } from '../actions/quiz_actions';
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

class QuizLesson extends Component {
    componentDidMount() {
        this.props.fetchQuizzesCompleted();
    }

    renderAnswers(answers){
        return _.map(answers, (answer) => {
            return(
                <div key={answer.id}>
                    <Field
                        name={answer.label}
                        label={answer.label}
                        disabled={this.props.disableCompleted}
                        component={Checkbox}
                        />
                </div>
            );
        });
    }

    renderQuizLabel(label, quiz_id) {
        if (this.props.completedQuiz[quiz_id]){
            let completed = this.props.completedQuiz[quiz_id].completed
            switch (completed)
            {
            case true:
                return (
                    <div className="card-body quiz-succeed-card-body">
                        <div className="row">
                            <div className="col"><span>SUCCEED</span></div>
                        </div>
                        <h5 className="quiz-card-title">{label}</h5>
                    </div>
                )
            case false:
                return (
                    <div className="card-body quiz-failed-card-body">
                        <div className="row">
                            <div className="col"><span>TRY AGAIN</span></div>
                        </div>
                        <h5 className="quiz-card-title">{label}</h5>
                    </div>

                )
            default:
                return (
                    <div className="card-body quiz-card-body">
                        <div className="row">
                            <div className="col"><span>QUIZ QUESTION</span></div>
                        </div>
                        <h5 className="quiz-card-title">{label}</h5>
                    </div>
                )
            }
        } else {
            return (
                <div className="card-body quiz-card-body">
                    <div className="row">
                        <div className="col"><span>QUIZ QUESTION</span></div>
                    </div>
                    <h5 className="quiz-card-title">{label}</h5>
                </div>
            )
        }
        
    }

    onSubmit(quiz_id, answers, values) {
        let r = []
        for (let [k, v] of Object.entries(values)) {
            r.push({label: k, correct: v})
        }
        let _correct_answers = answers
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
        this.props.quizCompleteOperation(completed, quiz_id)
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props
        return _.map(this.props.all_quizzes, (quiz) => {
            return(
                <div className="card quiz-card" key={quiz.id}>
                    {
                        this.renderQuizLabel(quiz.label, quiz.id)
                    }
                    
                    <div className="card-body">
                        <p>Select true answer / Note that one or more answer might be true</p>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this).bind(this, quiz.id, quiz.answers))}>
                            {this.renderAnswers(quiz.answers)}
                            <div className="text-right">
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        });
    }
}

function mapStateToProprs({ completedQuiz }, ownProps) {
    return { 
        completedQuiz: completedQuiz
     };
 }
 
 const afterSubmit = (result, dispatch) =>
   dispatch(reset('checkbox'));
 
 export default reduxForm({
     form: 'checkbox',
     onSubmitSuccess: afterSubmit,
 })(
     connect(mapStateToProprs, {  quizCompleteOperation, fetchQuizzesCompleted })(QuizLesson)
 );