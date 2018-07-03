import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSessions, deleteSession } from '../../actions/sessions_actions';
import NewSection from './NewSection';
import { Link } from 'react-router-dom';

class AdminSections extends Component {
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
                    <td><Link to={`sections/${session.id}/edit`}>{session.title}</Link></td>
                    <td>{session.lessons.length}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, session.id)}><span className="character-icon-normal">&#128465;</span></button></td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div>
                <NewSection />
                <div className="card table-card">
                    <h4 className="table-title">All Sections</h4>
                    <div>
                        <table className="table table-bordered table-striped">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Section Title</th>
                            <th scope="col">Lessons Count</th>
                            <th scope="col">Delete</th>
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

export default connect(mapStateToProprs, { fetchSessions, deleteSession })(AdminSections);