import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser, activateUser, deactivateUser, makeUserStaff, makeUserStudent } from '../../actions/users_actions';

class Profile extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSingleUser(id)
    }
    renderAssessmentMarks(marks){
        if (!marks) {
            return(
                <tr>
                    <td>Loading..</td>
                </tr>
            )
        } else {
            if (marks.length < 1) {
                return(
                    <tr>
                        <td>No assessment done yet!</td>
                    </tr>
                )
            }
            return _.map(marks, mark => {
                return(
                    <tr key={mark.id}>
                        <td className="tb-label">{mark.assessment_id}</td>
                        <td>{mark.marks}</td>
                    </tr>
                    
                );
            });
        }
        
    }

    renderExamMarks(marks){
        if (!marks) {
            return(
                <tr>
                    <td>Loading..</td>
                </tr>
            )
        } else {
            if (marks.length < 1) {
                return(
                    <tr>
                        <td>No exam done yet!</td>
                    </tr>
                )
            }
            return _.map(marks, mark => {
                return(
                    <tr key={mark.id}>
                        <td className="tb-label">{mark.exam_id}</td>
                        <td>{mark.marks}</td>
                    </tr>
                );
            });
        }
    }

    onActive(user_id) {
        this.props.activateUser(user_id)
    }

    onDeactive(user_id) {
        this.props.deactivateUser(user_id)
    }

    onStaff(user_id) {
        this.props.makeUserStaff(user_id)
    }

    onStudent(user_id) {
        this.props.makeUserStudent(user_id)
    }

    render() {
        const { user } = this.props
        return(
            <div>
                <div className="row staff-activate-row">
                    <div className="col activate-col">
                    {
                        user.is_active === false ?
                        <button className="btn btn-primary" onClick={this.onActive.bind(this, user.id)} > Activate </button> :
                        <button className="btn btn-outline-secondary" onClick={this.onDeactive.bind(this, user.id)}> Deactivate </button>
                    }
                    </div>
                    <div className="col staff-col">
                    {
                        user.is_staff === false ?
                        <button className="btn btn-primary" onClick={this.onStaff.bind(this, user.id)}> Make Staff  </button> :
                        <button className="btn btn-outline-secondary" onClick={this.onStudent.bind(this, user.id)}> Make Student  </button>
                    }
                    </div>
                </div>
                 <div className="card exam-marks-card">
                    <table className="">
                        <tbody>
                            <tr>
                                <td className="tb-label">Names:</td>
                                <td>{user.first_name} {user.last_name}</td>
                            </tr>
                            <tr>
                                <td className="tb-label">Username:</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td className="tb-label">Email:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td className="tb-label">Status:</td>
                                <td>
                                    {
                                        user.is_active === true ?
                                        <span className="green_icon"> Active </span> :
                                        <span className="red_icon"> Inactive </span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="tb-label">Role:</td>
                                <td>
                                    {
                                        user.is_staff === true ?
                                        <span className="green_icon"> Staff </span> :
                                        <span className="red_icon"> Student </span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="marks-title" />
                {
                    user.is_staff === false ?
                    <div>
                    <div className="marks-title">Assessment Marks</div>
                    <div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Exam</th>
                                    <th scope="col">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAssessmentMarks(user.assessment_marks)}
                            </tbody>
                        </table>
                    </div>
                    <hr className="marks-title" />
                    <div className="marks-title">Exam Marks</div>
                    <div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Exam</th>
                                    <th scope="col">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderExamMarks(user.exam_marks)}
                            </tbody>
                        </table>
                    </div>
                </div> :
                <div></div>
                }
                
                
            </div>
        )
    }
}

function mapStateToProprs(state) {
    return {
        user: state.user,

    };
}

export default connect(mapStateToProprs, { fetchSingleUser, activateUser, deactivateUser, makeUserStaff, makeUserStudent })(Profile);