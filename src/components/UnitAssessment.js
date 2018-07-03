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
        const { id } = this.props.match.params;
        return _.map(this.props.assessments, (assessment) => {
            return(
                <div key={assessment.id} className="assessment-area">
                    <div className="card green-bg">
                        <h5 className="exam-title">{assessment.label}</h5>
                    </div>
                    <div className="card published-assessment-card">
                        <AssessmentQuestion assessment_id={assessment.id}/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary" onClick={this.onRetake.bind(this, assessment.id)}>Retake</button>
                        </div>
                        <div className="col-6 rate-other-area text-right">
                            <Link to={`/unit/${id}/assessment/essays`}>Review Others</Link>
                        </div>
                    </div>
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
        assessments: state.assessments,
    };
}

export default connect(mapStateToProprs, { fetchUnitAssessments, retakeAssessment })(UnitAssessment);