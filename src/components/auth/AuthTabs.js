import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

class AuthTabs extends Component {
    constructor(props) {
        super(props);
        this.state = { onLogin: false };
    }
    goToSignUp() {
        this.setState({
            onLogin: false
        });
    }
    goToLogin() {
        this.setState({
            onLogin: true
        });
    }
    renderComponent() {
        if (this.state.onLogin === true) {
            return <Login />
        } else {
            return <Signup />
        }
    }
    render() {
        const {onLogin} = this.state;
        return (
            <div>
                <div className="row no-mrgn">
                    <div className={`col-6 auth-tabs ${onLogin? '':'tab-active'}`} onClick={this.goToSignUp.bind(this)}>Sign Up</div>
                    <div className={`col-6 auth-tabs ${onLogin? 'tab-active':''}`} onClick={this.goToLogin.bind(this)}>Login</div>
                </div>
                {this.renderComponent()}
            </div>
        );
    }
}

export default AuthTabs;