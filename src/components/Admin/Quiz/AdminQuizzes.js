import _ from 'lodash';
import React, { Component } from 'react';
import NewQuiz from "./NewQuiz"
import NewAnswer from './NewAnswer';
import { connect } from 'react-redux';
import { fetchAllQuizzes, deleteQuiz } from '../../../actions/quiz_actions';
import StepZilla from 'react-stepzilla';

const steps =
    [
      {name: 'New Quiz', component: <NewQuiz />},
      {name: 'New Answer', component: <NewAnswer />},
    ]

class AdminQuizzes extends Component {
    componentDidMount() {
        this.props.fetchAllQuizzes();
    }
    renderAnswers(answers){
        return _.map(answers, (answer) => {
            return(
                <li key={answer.id} className="row response-answers">
                    <div className="col-9">{answer.label}</div>
                    {answer.correct === true ?
                        <div className="true-span col-3 text-right">True</div>:
                        <div className="false-span col-3 text-right">False</div>
                    }
                </li>
            ); 
        });
    }
    onDelete(quiz_id) {
        this.props.deleteQuiz(quiz_id);
    }
    renderCard(){
        return _.map(this.props.quizzes, (quiz) => {
            return(
                <div key={quiz.id}>
                    {/* {
                        lesson.quizzes[0] !== undefined ? */}
                        <div className="card admin-quiz-card">
                            <div className="row">
                                <div className="col-10">
                                    <h5>Lesson: {quiz.lesson_title}</h5>
                                </div>
                                <div className="col-2 text-right">
                                    <button className="delete-btn" onClick={this.onDelete.bind(this, quiz.id)}><span className="character-icon-normal">&#128465;</span></button>
                                </div>
                            </div>
                            
                            <div className="quiz-area">
                                <div>
                                    <h6>Quiz: {quiz.label}</h6>
                                    <ul>
                                        {this.renderAnswers(quiz.answers)}
                                    </ul> 
                                </div>
                                <div></div>
                            </div>
                        </div> 
                        {/* : */}
                        <div ></div>
                    {/* } */}
                </div>
                
            );
        });
    }
    
    render() {
        return (
            <div>
                <div className='step-progress'>
                    <StepZilla steps={steps} showSteps={false} nextButtonCls="btn next-btn" backButtonCls="btn previous-btn"/>
                </div>
                {this.renderCard()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quizzes
    };
}

export default connect(mapStateToProps, { fetchAllQuizzes, deleteQuiz })(AdminQuizzes);