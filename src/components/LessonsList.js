import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSessionLessons, fetchLessonsCompleted } from '../actions/lessons_actions';
import { Link } from 'react-router-dom';

class LessonsList extends Component {
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.fetchSessionLessons(id);
        this.props.fetchLessonsCompleted();
        
    }
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    renderLessons() {
        return _.map(this.props.lessons, (lesson) => {
            const session_id = this.props.match.params.id;
            return(
                <div className="row" key={lesson.id}>
                    <div className="col-lg-1 lessons-list-index-card">
                        <span className="lesson-list-index-circle">{lesson.lesson_index}</span>
                        <div className="lesson-list-circle-left-line"></div>
                    </div>
                    {   
                        this.props.completed[lesson.id] &&  this.props.completed[lesson.id].completed === true ?
                        <div className="col-lg-11">
                            <div className="card lessons-list-card">
                                <div className="item row">
                                    <div className="col-md-9 col-lg-10">
                                        <a data-toggle="collapse" data-parent="#exampleAccordion" href={`#${lesson.id}`} role="button" aria-expanded="true" aria-controls="exampleAccordion1" className="lessons-list-title" >
                                            {lesson.title}
                                        </a>
                                        <div id={lesson.id} className="collapse show lessons-list-description" role="tabpanel">
                                            <p className="mb-3">
                                                {lesson.description}
                                            </p>
                                            <hr className="collapse-description-line" />
                                            <Link to={`/lesson/${session_id}/${lesson.id}`} className="btn btn-outline-primary">Review</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-2 align-self-center completed-label">&#x2714; Completed</div>
                                </div>
                            </div>
                        </div> :
                        <div className="col-lg-11">
                            <div className="card lessons-list-card">
                                <div className="item row">
                                    <div className="col-md-9 col-lg-10">
                                        <a data-toggle="collapse" data-parent="#exampleAccordion" href={`#${lesson.id}`} role="button" aria-expanded="true" aria-controls="exampleAccordion1" className="lessons-list-title" >
                                            {lesson.title}
                                        </a>
                                        <div id={lesson.id} className="collapse show lessons-list-description" role="tabpanel">
                                            <p className="mb-3">
                                                {lesson.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-lg-2 align-self-center lessons-list-start-btn">
                                        <Link to={`/lesson/${session_id}/${lesson.id}`} className="btn btn-primary">Start</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );
        });
    }
    render() {
        return (
            <div className="lessons-list-top-bg">
                <div className="container lessons-list">
                    <div className="" >
                        <Link to="/units" className="lessons-list-back-btn">&larr;</Link>
                    </div>
                    <div id="accordion" role="tablist">
                        {this.renderLessons()}
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProprs(state) {
    return {
        lessons: state.lessons,
        completed: state.completed
    };
}

export default connect(mapStateToProprs, { fetchSessionLessons, fetchLessonsCompleted })(LessonsList);