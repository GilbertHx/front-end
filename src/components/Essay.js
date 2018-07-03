import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleEssay } from '../actions/essay_actions';
import RateEssay from './RateEssay';

class Essay extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSingleEssay(id);
    }
    render() {
        const { essays } = this.props
        return (
            <div className="container">
                <h5 className="essay-title">{essays.title}</h5>
                <div className="card">
                    <p className="essay-content" dangerouslySetInnerHTML={{__html:essays.essay}}></p>
                </div>
                <RateEssay essay_id={essays.id}/>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        essays: state.essays
    };
}

export default connect(mapStateToProprs, { fetchSingleEssay })(Essay);