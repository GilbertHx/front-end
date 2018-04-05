import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUnitAssessments, retakeAssessment } from '../actions/assessment_actions';
import AssessmentQuestion from './AssessmentQuestion';

class UnitAssessment extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchUnitAssessments(id);
    }

    onRetake(assessment_id) {
        this.props.retakeAssessment(assessment_id)
    }
    renderAssessmentCard() {
        return _.map(this.props.assessments, (assessment) => {
            return(
                <div key={assessment.id}>
                    <h5 className="exam-card-title">{assessment.label}</h5>
                    <div className="card published-exam-card">
                        <AssessmentQuestion assessment_id={assessment.id}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.onRetake.bind(this, assessment.id)}>Reload</button>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="container">
                {this.renderAssessmentCard()}
            </div>
        );
    }
}


function mapStateToProprs(state) {
    return {
        assessments: state.assessments
    };
}

export default connect(mapStateToProprs, { fetchUnitAssessments, retakeAssessment })(UnitAssessment);