import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAssessment } from '../../../actions/assessment_actions';
import { fetchUnits } from '../../../actions/units_actions';

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

class NewAssessment extends Component {
    componentDidMount() {
        this.props.fetchUnits();        
    }
    onSubmit(values) {
        this.props.createAssessment(values);
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
                <h4>New Assessment</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
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
                        name="label"
                        type="text"
                        component={renderField}
                        label="Assessment Title"
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

function mapStateToProps(state) {
    return {
        units: state.units
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newassessmentform'));

export default reduxForm({
    form: 'newassessmentform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { createAssessment, fetchUnits })(NewAssessment)
);