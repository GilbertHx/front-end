import _ from 'lodash';
import React, { Component } from 'react';
import NewExam from './NewExam';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExams, deleteExam, deleteQuestion, publishExam } from '../../../actions/exam_actions';


class AdminExam extends Component {
    componentDidMount() {
        this.props.fetchExams();
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

    renderQuestion(questions){
        return _.map(questions, (question) => {
            return(
                <div className="admin-exam-question-card" key={question.id}>
                    <div className="row">
                        <div className="col">
                            <h6 className="">Question: {question.label}</h6>
                        </div>
                    </div>
                    <ul>
                        {this.renderAnswer(question.responses)}
                    </ul>
                </div>
            );
        });
    }
    onDeleteExam(exam_id){
        this.props.deleteExam(exam_id)
    }

    onUnApproved(exam_id){
        this.props.publishExam("False", exam_id)
    }

    onApproved(exam_id){
        this.props.publishExam("True", exam_id)
    }

    renderExamCard(){
        return _.map(this.props.exams, (exam) => {
            return(
                <div key={exam.id}>
                    <div className="card admin-exam-card">
                        <div className="row">
                            {
                                exam.published === true ?
                                <div className="col right-algn">
                                    <button className="approved-btn" onClick={this.onUnApproved.bind(this, exam.id)}><i className="far fa-check-circle fa-2x"></i></button>
                                </div> :
                                <div className="col right-algn">
                                    <button className="not-approved-btn" onClick={this.onApproved.bind(this, exam.id)}><i className="far fa-check-circle fa-2x"></i></button>
                                </div>
                            }
                        </div>
                        <Link to={`exams/${exam.id}/question/new`} className="link-card">   
                            <h5 className="exam-card-title">{exam.title}</h5>
                            {this.renderQuestion(exam.questions)}
                        </Link>
                        <div className="row">
                            <div className="col right-algn">
                                <button className="delete-btn" onClick={this.onDeleteExam.bind(this, exam.id)}><i className="far fa-trash-alt"></i></button>
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
                <NewExam />
                {this.renderExamCard()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        exams: state.exams
    };
}

export default connect(mapStateToProps, { fetchExams, deleteExam, deleteQuestion, publishExam })(AdminExam);