import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAssessmentQuestion } from '../../../actions/assessment_actions';


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
            {...input} rows="4"/>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

class NewAssessmentQuestion extends Component {
    onSubmit(values) {
        const { assessment_id } = this.props
        this.props.createAssessmentQuestion(values, assessment_id);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Question</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <Field
                        name="label"
                        type="text"
                        component={renderFieldArea}
                        label="Question Label"
                    />
                    <Field
                        name="marks"
                        type="number"
                        component={renderField}
                        label="Question Marks"
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
    if (!values.label) {
      errors.label = 'Required'
    }
    if (!values.marks) {
        errors.marks = 'Required'
    }
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newassessmentquestionform'));

export default reduxForm({
    form: 'newassessmentquestionform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, { createAssessmentQuestion })(NewAssessmentQuestion)
);