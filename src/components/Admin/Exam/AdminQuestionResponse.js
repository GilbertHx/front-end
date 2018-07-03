import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestionResponses } from '../../../actions/exam_actions';
import NewQuestionResponse from './NewQuestionResponse';

class AdminQuestionResponse extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchQuestionResponses(id);
    }
    renderAnswer(responses){
        return _.map(responses, (response) => {
            return(
                <li key={response.id} className="row response-answers">
                    <div className="col-9">{response.label}</div>
                    {
                        response.correct === true ?
                        <div className="true-span col-3 text-right">True</div>:
                        <div className="false-span col-3 text-right">False</div>
                    }
                </li>
            );
        });
    }
    renderQuestion(){
        const { questionResponses } = this.props
        return _.map(questionResponses, (question) => {
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
                    <NewQuestionResponse question_id={this.props.match.params.id} />
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
        questionResponses: state.questionResponses
    };
}

export default connect(mapStateToProps, { fetchQuestionResponses })(AdminQuestionResponse);