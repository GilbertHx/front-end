import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchExamAdminQuestions, deleteQuestion } from '../../../actions/exam_actions';
import NewExamQuestion from './NewExamQuestion';

class AdminQuestion extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchExamAdminQuestions(id);
    }
    renderAnswer(responses){
        return _.map(responses, (response) => {
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
    onDeleteQuestion(question_id){
        this.props.deleteQuestion(question_id)
    }
    renderQuestion(){
        const { questions } = this.props
        return _.map(questions, (question) => {
            return(
                <div key={question.id}>
                    <div className="admin-exam-question-card">
                        <div className="row">
                            <div className="col-9">
                                <Link to={`/admin/exams/question/${question.id}/answer`} className="link-card"><h6 className="">Question: {question.label}</h6></Link>
                            </div>
                            <div className="col-3 text-right">
                                <button className="delete-btn" onClick={this.onDeleteQuestion.bind(this, question.id)}><span className="character-icon-normal">&#128465;</span></button>
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
                <NewExamQuestion exam_id={this.props.match.params.id} />
                <div className="card admin-exam-card-question-responses">
                    {this.renderQuestion()}
                </div>
            </div>
        )   
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    };
}

export default connect(mapStateToProps, { fetchExamAdminQuestions, deleteQuestion })(AdminQuestion);