import _ from 'lodash';
import React, { Component } from 'react';
import { reset, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editLesson } from '../../actions/lessons_actions';
import { fetchSessions } from '../../actions/sessions_actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';

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

  const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
      <div className="form-group">
        <label>Audio</label>
        <Dropzone
          className="form-control"
          name={field.name}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >
          <div>Try dropping a Audio here, or click to select one to upload.</div>
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5,  false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  function renderQuill({ input }) {
   
    return (
      <ReactQuill
        theme="snow"
        modules={modules}
        {...input}
        onChange={(newValue, delta, source) => {
          if (source === 'user') {
            input.onChange(newValue);
          }
        }}
        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}
      />
    );  
  }

class EditLesson extends Component {
    componentDidMount() {
        this.props.fetchSessions();
    }
    onSubmit(values) {
        const { id } = this.props.match.params;
        this.props.editLesson(values, id);
    }
    renderOptions() {
        return _.map(this.props.sessions, session => {
            return(
                <option key={session.id} value={session.id}>{session.title}</option>
            );
        });
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="card new-card">
                <div>
                    <h4>Edit Lesson</h4>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                        <div className="row">
                            <div className="col-md-6">
                                <Field
                                    name="title"
                                    type="text"
                                    component={renderField}
                                    label="Title"
                                />
                                <div className="form-group"> 
                                    <label>Session</label>
                                    <div>
                                    <Field className="form-control" name="session" component="select">
                                        <option>------</option>
                                        {this.renderOptions()}
                                    </Field>
                                    </div>
                                </div>
                                <Field
                                    name="lesson_index"
                                    type="number"
                                    component={renderField}
                                    label="Lesson Index"
                                />
                                <Field
                                    name="video_url"
                                    type="text"
                                    component={renderField}
                                    label="Video"
                                />
                            </div>
                            <div className="col-md-6">
                                <Field
                                    name="description"
                                    component={renderFieldArea}
                                    label="Description"
                                />
                                <Field
                                    label="Audio"
                                    name="audio"
                                    component={renderDropzoneInput}
                                />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label>Content</label>
                            <div>
                                <Field
                                    name="content"
                                    component={renderQuill}
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
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    if (!values.lesson_index) {
        errors.lesson_index = 'Required'
    }
    if (!values.content) {
        errors.content = 'Required'
    }
    
    return errors
}

function mapStateToProps(state) {
    return {
        sessions: state.sessions
    };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('editlessonform'));

export default reduxForm({
    form: 'editlessonform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(mapStateToProps, { editLesson, fetchSessions })(EditLesson)
);