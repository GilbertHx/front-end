import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { signupUser } from '../../actions/auth_actions';


class Signup extends Component {
    
    handleFormSubmit(values) {
        //do stuff to sign up the user
        this.props.signupUser(values);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{this.props.errorMessage}
                </div>
            );
        } else if (this.props.successMessage) {
            return (
                <div className="alert alert-success">
                    <strong>Good! </strong>{this.props.successMessage}
                </div>
            );
        }
    }

    
    render() {
        const { handleSubmit } = this.props
        return (
            <div className="auth-form-container">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} method="POST">
                    <h5>Create Your Account</h5>
                    <p>Your account allow you access to all things: courses, exercises and more!</p>
                    <div className="row">
                        <div className="col-sm-6">
                            <fieldset className="form-group">
                                {/* <label htmlFor="username">Username</label> */}
                                <Field placeholder="Reg Number" name="username" component="input" type="text" className="form-control" />
                            </fieldset>                    
                        </div>
                        <div className="col-sm-6">
                            <fieldset className="form-group">
                                {/* <label htmlFor="email">Email</label> */}
                                <Field placeholder="Email" name="email" component="input" type="email" className="form-control" autoComplete='email' />
                            </fieldset>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                        <fieldset className="form-group">
                            {/* <label htmlFor="password1">Password</label> */}
                            <Field placeholder="Password" name="password1" component="input" type="password" className="form-control" autoComplete="true" />
                        </fieldset>
                        </div>
                        <div className="col-sm-6">
                            <fieldset className="form-group">
                                {/* <label htmlFor="password2">Confirm Password</label> */}
                                <Field placeholder="Confirm Password" name="password2" component="input" type="password" className="form-control" autoComplete="true" />
                            </fieldset>
                        </div>
                    </div>
                    {this.renderAlert()}
                    <div className="">
                        <button action="submit" className="btn btn-primary">Sign Up</button>
                        {/* <p className="have-account">Already have a account? <a href="/login" >Login</a></p> */}
                    </div>
                </form>
            </div>
        );
    }
}

function validate(formProps) {
    // validations

}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        successMessage: state.auth.success_msg,
    };
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('signup'));

export default reduxForm({
    form: 'signup',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect( mapStateToProps, { signupUser } )(Signup)
);