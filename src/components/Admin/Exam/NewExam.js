import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createExam } from '../../../actions/exam_actions';


const renderField = ({
    input,
    label,
    type,
    meta: { touched, error }
  }) => (
    <div className="form-group">
      <label>{label}</label>
      <div>
        <input 
            className="form-control"
            {...input} placeholder={label} type={type} />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

class NewExam extends Component {
    onSubmit(values) {
        this.props.createExam(values);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Exam</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <Field
                        name="title"
                        type="text"
                        component={renderField}
                        label="Exam Title"
                    />
                    <div>
                        <button className="btn btn-primary" type="submit" disabled={pristine ||submitting}>Submit</button>
                        <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    }
    
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newexamform'));

export default reduxForm({
    form: 'newexamform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, { createExam })(NewExam)
);