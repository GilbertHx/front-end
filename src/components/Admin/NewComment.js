import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUserComment } from '../../actions/users_actions';

const renderFieldArea = ({
    input,
    label,
    meta: { touched, error }
  }) => (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <textarea 
            className="form-control"
            {...input} rows="5"/>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

class NewComment extends Component {
    onSubmit(values) {
        const { user_id } = this.props
        this.props.createUserComment(user_id, values);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="new-comment">
                <hr className="hr-line" />
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <div className="row">
                        <div className="col-lg-12">
                            <Field
                                name="comment"
                                component={renderFieldArea}
                                label="Comment"
                            />
                        </div>
                    </div>
                    <div className="text-right"> 
                        <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                        <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Comment</button>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.comment) {
        errors.comment = 'Required'
    }
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newusercomment'));

export default reduxForm({
    form: 'newusercomment',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, { createUserComment })(NewComment)
);