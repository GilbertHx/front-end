import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUnit } from '../../actions/units_actions';

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
            {...input} rows="5"/>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

class NewUnit extends Component {
    onSubmit(values) {
        this.props.createUnit(values);
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <div>
                    <h4>New Unit</h4>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                        <div className="row">
                            <div className="col-lg-12">
                                <Field
                                    name="title"
                                    type="text"
                                    component={renderField}
                                    label="Title"
                                />
                                <Field
                                    name="description"
                                    component={renderFieldArea}
                                    label="Description"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
                            <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newunitform'));

export default reduxForm({
    form: 'newunitform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, { createUnit })(NewUnit)
);