import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import  Rating  from 'react-rating';
import { ReviewEssay } from '../actions/essay_actions';

const renderRatingField = ({
    input,
    label,
    type,
    meta: { touched, error }
  }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <Rating 
                {...input} initialRate={parseInt(input.value)}
                emptySymbol={<span className="rating-stars-color-empty">&#10032;</span>}
                fullSymbol={<span className="rating-stars-color">&#x272E;</span>}
            />
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

class RateEssay extends Component {
    onSubmit(values) {
        const { essay_id } = this.props
        this.props.ReviewEssay(values, essay_id)
    }
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div className="essay-rate">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} method="POST">
                    <div className="row">
                        <div className="col-lg-12">
                            <Field
                                name="rating"
                                component={renderRatingField}
                                label="Rating"
                            />
                            <Field
                                name="comment"
                                component={renderFieldArea}
                                label="Comment"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
                        <button className="btn btn-outline-secondary admin-clear-btn" disabled={pristine || submitting} onClick={reset}>Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.rating) {
      errors.rating = 'Required'
    }
    if (!values.comment) {
        errors.comment = 'Required'
    }
    
    return errors
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('essayratingform'));

export default reduxForm({
    form: 'essayratingform',
    validate,
    onSubmitSuccess: afterSubmit,
})(
    connect(null, {ReviewEssay})(RateEssay)
);