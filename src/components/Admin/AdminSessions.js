import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSessions, deleteSession } from '../../actions/sessions_actions';
import NewSession from './NewSession';

class AdminSessions extends Component {
    componentDidMount() {
        this.props.fetchSessions();
    }
    onDelete(session_id) {
        this.props.deleteSession(session_id);
    }
    renderSessions(){
        return _.map(this.props.sessions, session => {
            return(
                <tr key={session.id}>
                    <td>{session.title}</td>
                    <td>{session.lessons.length}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, session.id)}> <i className="far fa-trash-alt"></i></button></td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div>
                <NewSession />
                <div className="card table-card">
                    <h4 className="table-title">All Sessions</h4>
                    <div>
                        <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Lessons</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderSessions()}
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
        sessions: state.sessions
    };
}

export default connect(mapStateToProprs, { fetchSessions, deleteSession })(AdminSessions);