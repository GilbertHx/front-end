import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUnits } from '../actions/units_actions';

class Units extends Component {
    componentDidMount() {
        this.props.fetchUnits();
    }

    renderSessions(sessions) {
        return _.map(sessions, session => {
            return(
                <div className="col-md-6 col-lg-3" key={session.id}>
                    <Link to={`/lessons/all/${session.id}`} className="card session-card">
                        <div className="session-card-img-top"
                            style={{ background: `url(${session.image}) no-repeat top left`, backgroundSize: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title session-card-title"> {session.title}</h5>
                            <p className="card-text session-card-description">{session.description}</p>
                            {/* <span className="btn btn-primary col-lg-12">Enroll</span> */}
                        </div>
                    </Link>
                </div>  
            );
        });
    }

    renderUnits() {
        return _.map(this.props.units, unit => {
            return(
                <div key={unit.id}>
                    <h4>{unit.title}</h4>
                    <i>{unit.description}</i>
                    <div className="row align-items-center units-row">
                        {this.renderSessions(unit.sessions)}
                        <div className="col-md-6 col-lg-3">
                            <Link to={`/unit/${unit.id}/assessment`} className="link-card">
                                <div className="card assessment-card">
                                    <h5 className="unit-test-title">{unit.title} Assessment</h5>
                                    <div className="btn-start-container">
                                        <span className="btn-assessment-start">Start</span>
                                    </div>
                                </div>
                            </Link>
                        </div>    
                    </div>
                    {/* <div>
                        <div className="card unit-test-card">
                            <div className="row">
                                <div className="col">
                                    <h5 className="unit-test-title">{unit.title} Test</h5>
                                </div>
                                <div className="col unit-test-btn">
                                    <Link to={`/unit/${unit.id}/assessment`} className="btn btn-primary">Take The Test</Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="units-cpnment">
                    {this.renderUnits()}
                </div>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        units: state.units
    };
}

export default connect(mapStateToProprs, { fetchUnits })(Units);