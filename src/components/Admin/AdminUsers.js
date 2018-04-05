import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../actions/users_actions';

class AdminUsers extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return _.map(this.props.users, user => {
            return(
                <tr key={user.id}>
                    <td><Link to={`profile/${user.id}`}>{user.username}</Link></td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                    {user.is_active === true ?
                        <div className="green_icon"><i className="far fa-check-circle"></i></div> :
                        <div className="red_icon"><i className="fas fa-times"></i></div>
                    }</td>
                    <td>
                    {user.is_staff === true ?
                        <div className="green_icon"><i className="far fa-check-circle"></i></div> :
                        <div className="red_icon"><i className="fas fa-times"></i></div>
                    }</td>
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
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Names</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Active Status</th>
                                    <th scope="col">Staff Status</th>
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