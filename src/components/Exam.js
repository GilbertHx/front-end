import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublishedExams } from '../actions/exam_actions';
import ExamQuestion from './ExamQuestion';

class Exam extends Component {
    componentDidMount() {
        this.props.fetchPublishedExams();
    }
    
    renderExamCard(){
        return _.map(this.props.exams, (exam) => {
            return(
                <div key={exam.id} className="exam-area">
                    <div className="card green-bg">
                        <h5 className="exam-title">{exam.title}</h5>
                    </div>
                    <div className="card published-exam-card">
                        <ExamQuestion exam_id={exam.id}/>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container">
                {this.renderExamCard()}
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        exams: state.exams,
    };
}


export default connect(mapStateToProprs, { fetchPublishedExams })(Exam);
