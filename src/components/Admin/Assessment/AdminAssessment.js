import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllAssessments, deleteAssessment } from '../../../actions/assessment_actions';
import NewAssessment from './NewAssessment';

class AdminAssessment extends Component {

    componentDidMount() {
        this.props.fetchAllAssessments();
    }
    renderAnswer(responses){
        return _.map(responses, (response) => {
            return(
                <li key={response.id} className="row response-answers">
                    <div className="col-8">{response.label}</div>
                    {response.correct === true ?
                        <div className="true-span col-4 text-right">True</div>:
                        <div className="false-span col-4 text-right">False</div>
                    }
                </li>
            );
        });
    }
    renderQuestion(questions){
        return _.map(questions, (question) => {
            return(
                <div className="admin-exam-question-card" key={question.id}>
                    <div className="row">
                        <div className="col">
                        {
                            question.is_essay === false ?
                            <h6 className="">Question: {question.label}</h6> :
                            <h6 className="">Essay Question: {question.label}</h6>
                        }
                        </div>
                    </div>
                    <ul>
                        {this.renderAnswer(question.responses)}
                    </ul>
                </div>
            );
        });
    }
    onDeleteAssessment(assessment_id){
        this.props.deleteAssessment(assessment_id)
    }

    renderAssessmentCard() {
        return _.map(this.props.assessments, (assessment) => {
            return(
                <div key={assessment.id} className="col-md-6" >
                    <div className="card admin-exam-card">
                        
                        <Link to={`assessments/${assessment.id}/question/new`} className="link-card">
                            <h5 className="exam-card-title">{assessment.label}</h5>
                            {this.renderQuestion(assessment.questions)}
                        </Link>
                        <div className="row">
                            <div className="col text-right">
                                <button className="delete-btn" onClick={this.onDeleteAssessment.bind(this, assessment.id)}><span className="character-icon-normal">&#128465;</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <NewAssessment />
                <div className="row">
                    {this.renderAssessmentCard()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        assessments: state.assessments
    };
}


export default connect(mapStateToProps, { fetchAllAssessments, deleteAssessment })(AdminAssessment);