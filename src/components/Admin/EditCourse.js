import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCourse, fetchCourse } from '../../actions';

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

class EditCourse extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchCourse(id);
    }
    onSubmit(values, _id) {
        const { id } = this.props.match.params;
        
        this.props.editCourse(values, id, () => {
            this.props.history.push('/admin/courses');
        },);
    }
    render() {
        const { course } = this.props;
        console.log(course);
        
        const { handleSubmit, pristine, reset, submitting } = this.props
        if (course !== undefined) {
            return (
                <div>
                    <h2 className="admin-top-title">New Course</h2>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="title"
                                    type="text"
                                    
                                    component={renderField}
                                    label="Title"
                                />
                                <Field
                                    name="course_code"
                                    type="text"
                                    component={renderField}
                                    label="Course Code"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="description"
                                    component={renderFieldArea}
                                    label="Description"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit" disabled={submitting}>
                            Submit
                            </button>
                            <Link to="/admin/courses" className="btn btn-outline-secondary" disabled={pristine || submitting} onClick={reset}>
                            Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    Loading..
                </div>
            );
        }
    }
}


const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.course_code) {
        errors.course_code = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    
    return errors
}

function mapStateToProps(state) {
    return {
        course: state.courses.payload
    };
  }

export default reduxForm({
    form: 'editcourseform',
    validate,
})(
    connect(mapStateToProps, { editCourse, fetchCourse })(EditCourse)
);