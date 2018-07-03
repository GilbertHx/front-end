import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleEssay } from '../../actions/essay_actions';
import  Rating  from 'react-rating';

class AdminEssay extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSingleEssay(id);
    }

    renderReviews(reviews){
        return _.map(reviews, review => {
            return(
                <div key={review.id} className="card essay-comment-card">
                    <Rating
                        emptySymbol={<span className="">&#10032;</span>}
                        fullSymbol={<span className="">&#x272E;</span>}
                        initialRating={review.rating}
                        readonly
                    />
                    <p>{review.comment}</p>
                </div>
            );
        });
    }
    render() {
        const { essays } = this.props
        return (
            <div className="container">
                <h5 className="essay-title">{essays.title}</h5>
                <div className="card">
                    <p className="essay-content" dangerouslySetInnerHTML={{__html:essays.essay}}></p>
                </div>
                {
                    this.renderReviews(essays.reviews)
                }
                
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        essays: state.essays
    };
}

export default connect(mapStateToProprs, { fetchSingleEssay })(AdminEssay);