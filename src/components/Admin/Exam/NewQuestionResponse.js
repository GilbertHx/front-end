import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createQuestionResponse, fetchQuestions, createQuestionStatusQuestion } from '../../../actions/exam_actions';

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

class NewQuestionResponse extends Component {
    componentDidMount() {
        this.props.fetchQuestions();
    }
    onSubmit(values) {
        const { question_id } = this.props
        this.props.createQuestionResponse(values, question_id);
        this.props.createQuestionStatusQuestion(question_id)
    }
    renderQuestionsOptions(){
        return _.map(this.props.questions, question => {
            return(
                <option key={question.id} value={question.id}>{question.label}</option>
            );
        });
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <h4>New Answer</h4>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    {/* <div className="form-group">
                        <label>Question</label>
                        <div>
                            <Field className="form-control" name="question" component="select">
                                <option>------</option>
                                {this.renderQuestionsOptions()}
                            </Field>
                        </div>
                    </div> */}
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
    if (!values.question) {
      errors.question = 'Required'
    }
    if (!values.label) {
        errors.label = 'Required'
    }
    if (!values.correct) {
        errors.correct = 'Required'
    }
    return errors
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('newanswerform'));

export default reduxForm({
    form: 'newanswerform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { createQuestionResponse, fetchQuestions, createQuestionStatusQuestion })(NewQuestionResponse)
);