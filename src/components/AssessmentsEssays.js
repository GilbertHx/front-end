import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllEssays } from '../actions/essay_actions';

class AssessmentsEssays extends Component {
    componentDidMount() {
        this.props.fetchAllEssays();
    }
    renderEssays() {
        return _.map(this.props.essays, (essay) => {
            return(
                <div key={essay.id} className="card essay-card col-sm-6">
                    <Link to={`/unit/assessment/essay/${essay.id}/rate`} className="essay-title-rate" >
                        <h5>{essay.title}</h5>
                    </Link> 
                </div>
            );
        });
    }
    render() {
        return (
            <div className="container">
                {this.renderEssays()}
            </div>
        );
    }
}


function mapStateToProprs(state) {
    return {
        essays: state.essays
    };
}

export default connect(mapStateToProprs, { fetchAllEssays })(AssessmentsEssays);