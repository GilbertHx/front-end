import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { loginUser, getCurrentUser } from '../../actions/auth_actions';

class Login extends React.Component {
    handleFormSubmit(values) {
        this.props.loginUser(values, () => {
            this.props.getCurrentUser()
        });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

  render() {
    const { handleSubmit } = this.props
    return (
        <div>
            <div className="auth-form-container">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} method="POST">
                    <h5>Login Into Your Account</h5>
                    <p>Your account allow you access to all things: courses, exercises and more!</p>
                    <fieldset className="form-group">
                        {/* <label htmlFor="username">Username</label> */}
                        <Field placeholder="Username" name="username" component="input" type="text" className="form-control" />
                    </fieldset>                    
                    {/* <fieldset className="form-group">
                        <Field placeholder="Email" name="email" component="input" type="email" className="form-control" autoComplete='email' />
                    </fieldset> */}
                    <fieldset className="form-group">
                        {/* <label htmlFor="password">Password</label> */}
                        <Field placeholder="Password" name="password" component="input" type="password" className="form-control" autoComplete="true" />
                    </fieldset>
                    {this.renderAlert()}
                    <div className="">
                        <button action="submit" className="btn btn-primary">Login</button>
                        <a href="" className="forgot-password">I forgot my password</a>
                    </div>
                </form>
            </div>
        </div>
        
    );
  }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('login'));


export default reduxForm({
    form: 'login',
    onSubmitSuccess: afterSubmit,
})(
    connect( mapStateToProps, { loginUser, getCurrentUser } )(Login)
);