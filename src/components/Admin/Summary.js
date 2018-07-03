import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSummary } from '../../actions/summary_actions';

class Summary extends Component {
    componentWillMount() {
        this.props.fetchSummary();
    }

    render() {
        const { summary } = this.props
        return (
            <div className="summary">
                <div className="row">
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Staff</p>
                                <h3 className="summary-card-value summary-coral">{summary.staff_number}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Students</p>
                                <h3 className="summary-card-value summary-darkcyan">{summary.student_number}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Graduates</p>
                                <h3 className="summary-card-value summary-skyblue">{summary.graduates_number}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Done Exam</p>
                                <h3 className="summary-card-value summary-darkkhaki">{summary.ungraduates_number}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Still Learning</p>
                                <h3 className="summary-card-value summary-grey">{summary.still_learning_number}</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        summary: state.summary
    };
}

export default connect(mapStateToProprs, { fetchSummary })(Summary);