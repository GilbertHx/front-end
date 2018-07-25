import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editProfile } from '../actions/users_actions';

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
            {...input} rows="8"/>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

class EditProfile extends Component {
    
    onSubmit(values) {
        const { id } = this.props.match.params;
        this.props.editProfile(values, id);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="container">
                <div className="card new-card">
                    <h5>Edit Your Profile</h5>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="first_name"
                                    type="text"
                                    component={renderField}
                                    label="First Name"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="last_name"
                                    type="text"
                                    component={renderField}
                                    label="Last Name"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="national_id_number"
                                    type="number"
                                    component={renderField}
                                    label="National ID"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="birth_date"
                                    type="text"
                                    component={renderField}
                                    label="Birthday (YYYY-MM-DD)"
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="form-group"> 
                                    <label>Gender</label>
                                    <div>
                                    <Field className="form-control" name="gender" component="select">
                                        <option>------</option>
                                        <option key='1' value="M">Male</option>
                                        <option key='2' value="F">Female</option>
                                    </Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="hr-line"/>
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="province"
                                    type="text"
                                    component={renderField}
                                    label="Province"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="district"
                                    type="text"
                                    component={renderField}
                                    label="District"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="sector"
                                    type="text"
                                    component={renderField}
                                    label="Sector"
                                />
                            </div>
                        </div>
                        <hr className="hr-line"/>
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="qualification"
                                    type="text"
                                    component={renderField}
                                    label="Academic Qualification"
                                />
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                            <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.first_name) {
      errors.first_name = 'Required'
    }
    if (!values.last_name) {
        errors.last_name = 'Required'
    }
    if (!values.national_id_number) {
    errors.national_id_number = 'Required'
    }
    if (!values.birth_date) {
    errors.birth_date = 'Required'
    }
    if (!values.province) {
    errors.province = 'Required'
    }
    if (!values.gender) {
        errors.gender = 'Required'
    }
    if (!values.district) {
        errors.district = 'Required'
    }
    if (!values.sector) {
        errors.sector = 'Required'
    }
    if (!values.qualification) {
        errors.qualification = 'Required'
    }
    
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('editprofileform'));

export default reduxForm({
    form: 'editprofileform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, {editProfile})(EditProfile)
);