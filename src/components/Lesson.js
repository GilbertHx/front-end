import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    fetchLesson, fetchSessionLessons, fetchLessonsCompleted, lessonCompleteOperation
    } from '../actions/lessons_actions';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import QuizLesson from './QuizLesson';



class Lesson extends Component {
    componentDidMount() {
        const { id, session_id } = this.props.match.params;
        this.props.fetchLessonsCompleted();
        this.props.fetchLesson(id);
    }

    onUncomplete(lesson_id){
        const { session_id } = this.props.match.params;
        lessonCompleteOperation(false, lesson_id, () => {
            this.props.history.push(`/lessons/all/${session_id}/`);
        });
    }

    onComplete(lesson_id){
        const { session_id } = this.props.match.params;
        lessonCompleteOperation(true, lesson_id, () => {
            this.props.history.push(`/lessons/all/${session_id}/`);
        });
    }
    
    render() {
        const { lesson } = this.props;
        const { session_id } = this.props.match.params;
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
                                    <Link to={`/lessons/all/${session_id}`} className="lesson-back-btn">&larr;
                                        <span className="navbar-brand"> Back</span>
                                    </Link>
                                    <span className="lesson-top-title">{lesson.title}</span>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-sm-11 col-md-10 col-lg-7 col-xl-6 lesson-content">
                                    <p className="" dangerouslySetInnerHTML={{__html:lesson.content}}></p>
                                    {
                                        lesson.audio ? 
                                            <ReactAudioPlayer
                                                src={lesson.audio}
                                                controls
                                                /> :
                                            <div></div>
                                    }
                                   
                                    {
                                        lesson.video_url ? 
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe className="embed-responsive-item" src={lesson.video_url} allowFullScreen title="video_url"></iframe>
                                            </div> :
                                            <div></div>
                                    }
                               
                                    <QuizLesson all_quizzes={lesson.quizzes}/>
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

function mapStateToProprs({ lessons, completed }, ownProps) {
   return { 
       lesson: lessons[ownProps.match.params.id],
       completed: completed
    };
}

export default connect(mapStateToProprs, { fetchLesson, fetchLessonsCompleted, lessonCompleteOperation })(Lesson);