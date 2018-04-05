import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchLesson, fetchSessionLessons, fetchLessonsCompleted, lessonCompleteOperation
    } from '../actions/lessons_actions';

import { 
     quizCompleteOperation, fetchQuizAnswers, fetchQuizzesCompleted 
    } from '../actions/quiz_actions';

import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { reset, Field, reduxForm } from 'redux-form'

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

class Lesson extends Component {
    componentDidMount() {
        const { id, course_id } = this.props.match.params;
        this.props.fetchSessionLessons(course_id);
        this.props.fetchLessonsCompleted();
        this.props.fetchQuizzesCompleted();
        this.props.fetchLesson(id);
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

    onUncomplete(lesson_id){
        const { course_id } = this.props.match.params;
        lessonCompleteOperation("False", lesson_id, () => {
            this.props.history.push(`/lessons/all/${course_id}/`);
        });
    }

    onComplete(lesson_id){
        const { course_id } = this.props.match.params;
        lessonCompleteOperation("True", lesson_id, () => {
            this.props.history.push(`/lessons/all/${course_id}/`);
        });
    }

    onSubmit(quiz_id, values) {
        let r = []
        for (let [k, v] of Object.entries(values)) {
            r.push({label: k, correct: v})
        }
        let _correct_answers = this.props.lesson.quizzes[0].answers
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
        const { lesson } = this.props;
        const { course_id } = this.props.match.params;
        const { handleSubmit, pristine, submitting } = this.props
        if (!lesson || !lesson['quizzes']) {
            return <div>Loading...</div>
        }
        return (
            <div className="container-fluid">
                <div className="row lesson-pg">
                    <div className="col-12">
                        <div className="lesson-body">
                            <div className="row">
                                <div className="col lesson-top-bar">
                                    <Link to={`/lessons/all/${course_id}`} className="lesson-back-btn">&larr;
                                        <span className="navbar-brand"> Back</span>
                                    </Link>
                                    <span className="lesson-top-title">{lesson.title}</span>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-11 col-md-10 col-lg-7 col-xl-6 lesson-content">
                                    <p className="" dangerouslySetInnerHTML={{__html:lesson.content}}></p>
                                    <ReactAudioPlayer
                                        src={lesson.audio}
                                        controls
                                        />
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={lesson.video_url} allowFullScreen title="video_url"></iframe>
                                    </div>
                                    {
                                        lesson.quizzes[0] !== undefined ?
                                            lesson.quizzes[0].answers.length > 0 ?
                                                <div>
                                                    {   this.props.completedQuiz[lesson['quizzes'][0].id] ?
                                                            this.props.completedQuiz[lesson['quizzes'][0].id].completed === true ?
                                                            <div>
                                                                {
                                                                    lesson.quizzes.length > 0 ?
                                                                        <div className="card quiz-card">
                                                                            <div className="card-body quiz-succeed-card-body">
                                                                                <div className="row">
                                                                                    {/* <div className="col"><span>QUIZ QUESTION</span></div> */}
                                                                                    <div className="col"><span>SUCCEED</span></div>
                                                                                </div>
                                                                                <h5 className="card-title">{lesson['quizzes'][0].label}</h5>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <form onSubmit={handleSubmit(this.onSubmit.bind(this).bind(this, lesson['quizzes'][0].id))}>
                                                                                    {this.renderAnswers(lesson['quizzes'][0].answers)}
                                                                                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                                                                        Submit
                                                                                    </button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        <h2></h2>
                                                                }
                                                            </div>:
                                                            <div>
                                                                {
                                                                    lesson.quizzes.length > 0 ?
                                                                        <div className="card quiz-card">
                                                                            <div className="card-body quiz-failed-card-body">
                                                                                <div className="row">
                                                                                    {/* <div className="col"><span>QUIZ QUESTION</span></div> */}
                                                                                    <div className="col"><span>TRY AGAIN</span></div>
                                                                                </div>
                                                                                <h5 className="card-title">{lesson['quizzes'][0].label}</h5>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <p>Select true answer / Note that one or more answer might be true</p>
                                                                                <form onSubmit={handleSubmit(this.onSubmit.bind(this).bind(this, lesson['quizzes'][0].id))}>
                                                                                    {this.renderAnswers(lesson['quizzes'][0].answers)}
                                                                                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                                                                        Submit
                                                                                    </button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        <h2></h2>
                                                                }
                                                            </div> :
                                                            <div>
                                                                {
                                                                    lesson.quizzes.length > 0 ?
                                                                        <div className="card quiz-card">
                                                                            <div className="card-body quiz-card-body">
                                                                                <div className="row">
                                                                                    <div className="col"><span>QUIZ QUESTION</span></div>
                                                                                </div>
                                                                                <h5 className="card-title">{lesson['quizzes'][0].label}</h5>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <p>Select true answer / Note that one or more answer might be true</p>
                                                                                <form onSubmit={handleSubmit(this.onSubmit.bind(this).bind(this, lesson['quizzes'][0].id))}>
                                                                                    {this.renderAnswers(lesson['quizzes'][0].answers)}
                                                                                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                                                                        Submit
                                                                                    </button>
                                                                                </form>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        <h2></h2>
                                                                }
                                                            </div>
                                                    }
                                                </div> :
                                            <div></div> :
                                        <div></div>
                                    }
                                </div>
                            </div>
                            <div className="row justify-content-end lesson-complete-row">
                                <div className="lesson-complete-btn">
                                {
                                    this.props.completed[lesson.id] &&  this.props.completed[lesson.id].completed === true ?
                                        <button onClick={this.onUncomplete.bind(this, lesson.id)} className="btn btn-outline-secondary" >Uncomplete</button> :
                                        <button onClick={this.onComplete.bind(this, lesson.id)} className="btn btn-primary">Complete</button>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProprs({ lessons, completed, answers, completedQuiz }, ownProps) {
   return { 
    //    lessonsList: lessons, 
       lesson: lessons[ownProps.match.params.id],
       completed: completed,
       answers: answers,
       completedQuiz: completedQuiz
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('checkbox'));

export default reduxForm({
    form: 'checkbox',
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProprs, { fetchLesson, fetchSessionLessons, fetchLessonsCompleted, lessonCompleteOperation, quizCompleteOperation, fetchQuizAnswers, fetchQuizzesCompleted })(Lesson)
);