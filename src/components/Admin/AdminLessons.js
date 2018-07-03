import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, deleteLesson } from '../../actions/lessons_actions';
import NewLesson from './NewLesson';
import { Link } from 'react-router-dom';

class AdminLessons extends Component {
    componentDidMount() {
        this.props.fetchLessons();
    }
    onDelete(lesson_id) {
        this.props.deleteLesson(lesson_id);
    }
    renderLessons(){
        return _.map(this.props.lessons, (lesson) => {
            return(
                <tr key={lesson.id}>
                    <td><Link to={`lesson/${lesson.id}/edit`}>{lesson.title}</Link></td>
                    <td>{lesson.session_title}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, lesson.id)}><span className="character-icon-normal">&#128465;</span></button></td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div>
                <NewLesson />
                <div className="card table-card">
                    <h4 className="table-title">All Lessons</h4>
                    <div>
                        <table className="table table-bordered table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Lesson Title</th>
                                <th scope="col">Session Title</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderLessons()}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        lessons: state.lessons
    };
}
export default connect(mapStateToProprs, { fetchLessons, deleteLesson })(AdminLessons);