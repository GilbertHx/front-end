import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createQuiz } from '../../../actions/quiz_actions';
import { fetchLessons } from '../../../actions/lessons_actions';

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

class NewQuiz extends Component {
    componentDidMount() {
        this.props.fetchLessons();
    }
    onSubmit(values) {
        this.props.createQuiz(values);
    }
    renderLessonOptions(){
        return _.map(this.props.lessons, lesson => {
            return(
                <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            );
        });
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Quiz</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <div className="form-group">
                        <label>Lesson</label>
                        <div>
                            <Field className="form-control" name="lesson" component="select">
                                <option>------</option>
                                {this.renderLessonOptions()}
                            </Field>
                        </div>
                    </div>
                    <Field
                        name="label"
                        type="text"
                        component={renderFieldArea}
                        label="Quiz Label"
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
    if (!values.lesson) {
      errors.lesson = 'Required'
    }
    if (!values.label) {
        errors.label = 'Required'
    }
    
    return errors
}

function mapStateToProps(state) {
    return {
        lessons: state.lessons
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newquizform'));

export default reduxForm({
    form: 'newquizform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { createQuiz, fetchLessons })(NewQuiz)
);