import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/users_actions';

class AdminUsers extends Component {
    componentDidMount() {
        this.props.fetchUsers();
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
                    <td key={stage.id}>{this.renderStageValue(stage.user_stage)}</td>
            );
        });
    }

    renderUsers() {
        return _.map(this.props.users, user => {
            return(
                <tr key={user.id}>
                    <td><Link to={`profile/${user.id}`}>{user.username}</Link></td>
                    <td>{user.profile.first_name} {user.profile.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                    {
                        user.is_active === true ?
                        <span className="green_icon"> Active </span> :
                        <span className="red_icon"> Inactive </span>
                    }
                    </td>
                    <td>
                    {
                        user.is_staff === true ?
                        <span> Staff </span> :
                        <span> Student </span>
                    }
                    </td>
                    { this.renderStage(user.stage) }
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="table-users">
                <div className="card table-card">
                    <h4 className="table-title">All Users</h4>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Names</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderUsers()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProprs, { fetchUsers })(AdminUsers);