import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editSession } from '../../actions/sessions_actions';
import { fetchUnits } from '../../actions/units_actions';
import Dropzone from 'react-dropzone';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
      <div className="form-group">
        <label>Image</label>
        <Dropzone
          className="form-control"
          name={field.name}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >
          <div>Try dropping a Image here, or click to select one to upload.</div>
        </Dropzone>
        {field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <ul>
            { files.map((file, i) => <li key={i}>{file.name}</li>) }
          </ul>
        )}
      </div>
    );
  }

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

class EditSections extends Component {
    componentDidMount() {
        this.props.fetchUnits();        
    }
    onSubmit(values) {
        const { id } = this.props.match.params;
        this.props.editSession(values, id);
    }
    renderOptions() {
        return _.map(this.props.units, unit => {
            return(
                <option key={unit.id} value={unit.id}>{unit.title}</option>
            );
        });
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <div>
                    <h4>Edit Section</h4>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group"> 
                                    <label>Unit</label>
                                    <div>
                                    <Field className="form-control" name="unit" component="select">
                                        <option>------</option>
                                        {this.renderOptions()}
                                    </Field>
                                    </div>
                                </div>
                                <Field
                                    label="Image"
                                    name="image"
                                    component={renderDropzoneInput}
                                />
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
    if (!values.unit) {
      errors.unit = 'Required'
    }
    if (!values.image) {
        errors.image = 'Required'
    }
    if (!values.title) {
    errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    
    return errors
}

function mapStateToProps(state) {
    return {
        units: state.units
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('editsessionform'));

export default reduxForm({
    form: 'editsessionform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { editSession, fetchUnits })(EditSections)
);