import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLessons, deleteLesson } from '../../actions/lessons_actions';
import NewLesson from './NewLesson';

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
                    <td>{lesson.title}</td>
                    <td>{lesson.session}</td>
                    <td>{lesson.lesson_index}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, lesson.id)}> <i className="far fa-trash-alt"></i></button></td>
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
                        <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Course</th>
                                <th scope="col">Index</th>
                                <th scope="col"></th>
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