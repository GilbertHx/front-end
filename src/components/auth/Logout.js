import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth_actions';
import { Link } from 'react-router-dom';

class Logout extends Component {
    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return <div className="container">
            <h5 className="come-back-soon">
                Come back soon..
            </h5>
            Click <Link to="/">Here</Link> To Go Back Home
        </div>;
    }
}

export default connect(null, { logoutUser })(Logout)