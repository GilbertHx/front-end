import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAssessmentQuestionResponse, createQuestionStatusQuestion } from '../../../actions/assessment_actions';

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

class NewAssessmentQuestionResponse extends Component {
    onSubmit(values) {
        const { question_id } = this.props
        this.props.createAssessmentQuestionResponse(values, question_id);
        this.props.createQuestionStatusQuestion(question_id);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Answer</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <Field
                        name="label"
                        type="text"
                        component={renderFieldArea}
                        label="Answer Label"
                    />
                    <div className="form-group">
                        <label>Correct</label>
                        <div>
                            <Field className="form-control" name="correct" component="select">
                                <option>------</option>
                                <option key='false' value='false'>False</option>
                                <option key='true' value='true'>True</option>
                            </Field>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                        <button className="btn btn-primary" type="submit" disabled={pristine ||submitting}>Submit</button>
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
    if (!values.correct) {
        errors.correct = 'Required'
    }
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newassessmentanswerform'));

export default reduxForm({
    form: 'newassessmentanswerform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, { createAssessmentQuestionResponse, createQuestionStatusQuestion })(NewAssessmentQuestionResponse)
);