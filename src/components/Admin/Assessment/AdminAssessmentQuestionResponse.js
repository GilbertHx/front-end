import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssessmentQuestionResponses } from '../../../actions/assessment_actions';
import NewAssessmentQuestionResponse from './NewAssessmentQuestionResponse';

class AdminAssessmentQuestionResponse extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchAssessmentQuestionResponses(id);
    }
    renderAnswer(responses){
        return _.map(responses, (response) => {
            console.log(response)
            return(
                <li key={response.id} className="row response-answers">
                    <div className="col-9">{response.label}</div>
                    {response.correct === true ?
                        <div className="true-span col-3 text-right">True</div>:
                        <div className="false-span col-3 text-right">False</div>
                    }
                </li>
            );
        });
    }
    renderQuestion(){
        const { assessmentQuestionResponses } = this.props
        return _.map(assessmentQuestionResponses, (question) => {
            return(
                <div className="admin-exam-question-card" key={question.id}>
                    <div className="row">
                        <div className="col-9">
                           <h6 className="">Question: {question.label}</h6>
                        </div>
                        <div className="col-3 text-right">
                            {/* <button className="delete-btn" onClick={this.onDeleteQuestion.bind(this, question.id)}><i className="far fa-trash-alt"></i></button> */}
                        </div>
                    </div>
                    <ul>
                        {this.renderAnswer(question.responses)}
                    </ul>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                <div>
                    <NewAssessmentQuestionResponse question_id={this.props.match.params.id} />
                    <div className="card admin-exam-card-question-responses">
                        {this.renderQuestion()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        assessmentQuestionResponses: state.assessmentQuestionResponses
    };
}

export default connect(mapStateToProps, { fetchAssessmentQuestionResponses })(AdminAssessmentQuestionResponse);