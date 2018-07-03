import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createExamQuestion, fetchExams } from '../../../actions/exam_actions';

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
class NewExamQuestion extends Component {
    componentDidMount() {
        this.props.fetchExams();
    }
    onSubmit(values) {
        const { exam_id } = this.props
        this.props.createExamQuestion(values, exam_id);
    }
    renderOptions() {
        return _.map(this.props.exams, exam => {
            return(
                <option key={exam.id} value={exam.id}>{exam.title}</option>
            );
        });
    }

    renderErrorAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Question</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    {/* <div className="form-group"> 
                        <label>Exam</label>
                        <div>
                        <Field className="form-control" name="exam" component="select">
                            <option>------</option>
                            {this.renderOptions()}
                        </Field>
                        </div>
                    </div> */}
                    
                    {this.renderErrorAlert()}
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
    if (!values.marks) {
        errors.marks = 'Required'
    }
    
    return errors
}

function mapStateToProps(state) {
    return {
        exams: state.exams,
        errorMessage: state.auth.error
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newexamquestionform'));

export default reduxForm({
    form: 'newexamquestionform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { createExamQuestion, fetchExams })(NewExamQuestion)
);