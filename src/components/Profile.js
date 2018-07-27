import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCurrentUserProfile } from '../actions/users_actions';
import TimeAgo from 'react-timeago';

class Profile extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
          this.props.fetchCurrentUserProfile();
        }
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
                        <Link to={`/profile/${essay.id}/essay`} className="essay-title-rate" >
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

    render() {
        const { user } = this.props
        
        if (!user) {
            return(
                <div>Loading.. </div>
            )
        }
        return (
            <div className="container profile-cpnment">
                {
                    user.certificate ?
                    <div>
                        <div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Conglatulation!</h5>
                                    <p className="card-text">You've succefully completed this program click the betton below to view your certificate</p>
                                    <a href={ user.certificate.url } type="application/pdf" target="_blank">View Certificate</a>
                                </div>
                            </div>
                        </div>
                        <hr className="hr-line" />
                    </div> :
                    <div></div>
                }
                <h5>Profile info: </h5>
                 <div className="card exam-marks-card">
                    {
                        user.profile !== undefined ?
                        <div className="text-right">
                            <Link to={`/profile/${user.profile.id}/edit`} className="edit-profile-a"><span className="character-icon-normal">&#128393;</span>Edit</Link> 
                        </div>:
                        <span></span>
                    }
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
                        </tbody>
                    </table>
                </div>
                {
                    user.essay_submitted !== undefined && user.essay_submitted.length > 0 ?
                    <div>
                    <hr className="hr-line" />
                    <h5>Sumitted Essays </h5>
                    <div>
                        {this.renderSubmittedEssays(user.essay_submitted)}
                    </div>
                </div> :
                <div></div>
                }

                <hr className="hr-line" />
                <h5>Assessment Marks: </h5>
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

                {
                    user.comments !== undefined && user.comments.length > 0?
                    <div>
                        <div>
                            <hr className="hr-line" />
                            <h5>Comments:</h5>
                            {this.renderComments(user.comments)}
                        </div>
                    </div> :
                    <div></div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
      user: state.current_user_profile
    };
  }
  
  export default connect(mapStateToProps, { fetchCurrentUserProfile })(Profile);