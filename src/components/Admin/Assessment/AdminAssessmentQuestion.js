import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleAssessmentQuestionsAdmin, deleteAssessmentQuestion } from '../../../actions/assessment_actions';
import NewAssessmentQuestion from './NewAssessmentQuestion';

class AdminAssessmentQuestion extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSingleAssessmentQuestionsAdmin(id);
    }
    renderAnswer(responses){
        return _.map(responses, (response) => {
            return(
                <li key={response.id} className="row response-answers">
                    <div className="col-9">{response.label}</div>
                    {response.correct === true ?
                        <div className="true-span col-3 right-algn">True</div>:
                        <div className="false-span col-3 right-algn">False</div>
                    }
                </li>
            );
        });
    }
    onDeleteQuestion(question_id){
        this.props.deleteAssessmentQuestion(question_id)
    }
    renderQuestion(){
        const { assessmentQuestions } = this.props
        return _.map(assessmentQuestions, (question) => {
            return(
                <div key={question.id}>
                    <div className="admin-exam-question-card">
                        <div className="row">
                            <div className="col">
                                <Link to={`/admin/assessments/question/${question.id}/answer`} className="link-card"><h6 className="">Question: {question.label}</h6></Link>
                            </div>
                            <div className="col right-algn">
                                <button className="delete-btn" onClick={this.onDeleteQuestion.bind(this, question.id)}><i className="far fa-trash-alt"></i></button>
                            </div>
                        </div>
                        <ul>
                            {this.renderAnswer(question.responses)}
                        </ul>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                <NewAssessmentQuestion assessment_id={this.props.match.params.id}/>
                <div className="card admin-exam-card-question-responses">
                    {this.renderQuestion()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        assessmentQuestions: state.assessmentQuestions
    };
}

export default connect(mapStateToProps, { fetchSingleAssessmentQuestionsAdmin, deleteAssessmentQuestion })(AdminAssessmentQuestion);