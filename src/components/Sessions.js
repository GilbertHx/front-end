import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSessions } from '../actions/sessions_actions';

class Sessions extends Component {
    componentDidMount() {
        this.props.fetchSessions();
    }

    renderSessions() {
        return _.map(this.props.sessions, session => {
            return(
                <div className="col-sm-6 col-lg-4" key={session.id}>
                    <Link to={`/lessons/all/${session.id}`} className="card course-card">
                        <div className="course-card-img-top" 
                            style={{ background: `url(${session.image}) no-repeat top left`, backgroundSize: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title course-card-title"> {session.title}</h5>
                            <p className="card-text course-card-description">{session.description}</p>
                            <span className="btn btn-primary col-lg-12">Enroll</span>
                        </div>
                    </Link>
                </div>  
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.renderSessions()}
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

export default connect(mapStateToProprs, { fetchSessions })(Sessions);