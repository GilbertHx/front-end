import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth_actions';

class Logout extends Component {
    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return <div className="container" >Come back soon...</div>;
    }
}

export default connect(null, { logoutUser })(Logout)