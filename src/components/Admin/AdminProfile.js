import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser, activateUser, deactivateUser, makeUserStaff, makeUserStudent, ungraduateStudent, graduateStudent } from '../../actions/users_actions';
import TimeAgo from 'react-timeago';
import NewComment from './NewComment';

class AdminProfile extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSingleUser(id)
    }

    renderSubmittedEssays(essays) {
        if (!essays) {
            return(
                <div>Loading..</div>
            )
        } else {
            if (essays.length < 1) {
                return(
                    <div>No essay submitted yet!</div>
                )
            }
            return _.map(essays, essay => {
                return(
                    <div key={essay.id} className="card essay-card col-sm-6">
                        <Link to={`/admin/profile/essay/${essay.id}`} className="essay-title-rate" >
                            <h5>{essay.title}</h5>
                        </Link>
                    </div>
                );
            });
        }
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
                        <td className="tb-label">{mark.assessment_title}</td>
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
                        <td className="tb-label">{mark.exam_title}</td>
                        <td>{mark.marks}</td>
                    </tr>
                );
            });
        }
    }

    renderStageValue(user_stage) {
        switch (user_stage)
        {
        case "I":
            return (
                <span>Still Learning</span>
            )
        case "U":
            return (
                <span>Done Exam</span>
            )
        case "G":
            return (
                <span>Graduated</span>
            )
        default:
            return (
                <span>Not Student</span>
            )
        }
    }

    renderStage(stages) {
        return _.map(stages, stage => {
            return(
                    <td key={stage.id} className="tb-label">{this.renderStageValue(stage.user_stage)}</td>
            );
        });
    }

    renderComments(comments) {
        if (!comments) {
            return(
                <div>Loading..</div>
            )
        } else {
            if (comments.length < 1) {
                return(
                    <div></div>
                )
            }

            const myComments = [].concat(comments).sort((a, b) => a.created_at < b.created_at)
            
            return _.map(myComments, comment => {
                return(
                    <div className="card" key={comment.id}>
                        <div className="card-body-comment">
                            <TimeAgo date={comment.created_at} className="date-time-ago"/>
                            <p className="card-text">{comment.comment}</p>
                        </div>
                    </div>
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

    onGraduate(user_id) {
        this.props.graduateStudent(user_id)
    }

    onUngraduate(user_id, certificate_id) {
        this.props.ungraduateStudent(user_id, certificate_id)
    }

    render() {
        const { user } = this.props
        console.log(user);
        if (!user) {
            return(
                <div>Loading.. </div>
            )
        }
        return(
            <div className="admin-profile">
                <div className="row staff-activate-row">
                    <div className="col activate-col">
                    {
                        user.is_active === false ?
                        <button className="btn btn-primary" onClick={this.onActive.bind(this, user.id)} > Activate </button> :
                        <button className="btn btn-outline-secondary" onClick={this.onDeactive.bind(this, user.id)}> Deactivate </button>
                    }
                    </div>
                    <div className="col text-right">
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
                                {
                                    user.profile !== undefined ?
                                    <td>{user.profile.first_name} {user.profile.last_name}</td> :
                                    <td></td>
                                }
                                
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
                                <td><hr /></td>
                                <td><hr /></td>
                            </tr>
                            <tr>
                                <td className="tb-label">National Id #:</td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.national_id_number} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td className="tb-label">Date Of Birth: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.birth_date} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td className="tb-label">Gender: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.gender} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td className="tb-label">Qualification: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.qualification} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td><hr /></td>
                                <td><hr /></td>
                            </tr>
                            <tr>
                                <td className="tb-label">Province: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.province} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td className="tb-label">District: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.district} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td className="tb-label">Sector: </td>
                                {
                                    user.profile !== undefined ?
                                    <td> {user.profile.sector} </td> :
                                    <td></td>
                                }
                            </tr>
                            <tr>
                                <td><hr /></td>
                                <td><hr /></td>
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
                            <tr>
                                <td className="tb-label">Stage: </td>
                                { this.renderStage(user.stage) }
                            </tr>
                        </tbody>
                    </table>
                </div>
                {
                    user.is_staff === false || user.is_staff === true ?
                    <div>
                    <hr className="hr-line" />
                    <h5>Sumitted Essays</h5>
                    <div>
                        {this.renderSubmittedEssays(user.essay_submitted)}
                    </div>
                    <hr className="hr-line" />
                    <h5>Assessment Marks</h5>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Assessment</th>
                                    <th scope="col">Marks in (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAssessmentMarks(user.assessment_marks)}
                            </tbody>
                        </table>
                    </div>
                    <hr className="hr-line" />
                    <h5>Exam Marks</h5>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Exam</th>
                                    <th scope="col">Marks in (%)</th>
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
                <div className="col text-right graduate-btn">
                {
                    user.stage !== undefined && user.stage.length > 0?
                    user.stage[0].user_stage != "G" ?
                    <button className="btn btn-primary" onClick={this.onGraduate.bind(this, user.id)} > Graduate Student </button> :
                    <button className="btn btn-outline-secondary" onClick={this.onUngraduate.bind(this, user.id, user.certificate.id)}> Ungraduate Student </button> :
                    <span></span>
                }
                </div>
                <NewComment user_id={user.id}/>
                {
                    user.comments !== undefined && user.comments.length > 0?
                    <div>
                        <div>
                            {this.renderComments(user.comments)}
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

export default connect(mapStateToProprs, { fetchSingleUser, activateUser, deactivateUser, makeUserStaff, makeUserStudent, ungraduateStudent , graduateStudent })(AdminProfile);