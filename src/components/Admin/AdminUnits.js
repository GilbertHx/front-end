import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUnits, deleteUnit } from '../../actions/units_actions';
import NewUnit from './NewUnit';
import { Link } from 'react-router-dom';

class AdminSessions extends Component {
    componentDidMount() {
        this.props.fetchUnits();
    }
    onDelete(unit_id) {
        this.props.deleteUnit(unit_id);
    }
    renderUnits(){
        return _.map(this.props.units, unit => {
            return(
                <tr key={unit.id}>
                    <td><Link to={`unit/${unit.id}/edit`}>{unit.title}</Link></td>
                    <td>{unit.sessions.length}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, unit.id)}><span className="character-icon-normal">&#128465;</span></button></td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div>
                <NewUnit />
                <div className="card table-card">
                    <h4 className="table-title">All Units</h4>
                    <div>
                        <table className="table table-bordered table-striped">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Unit Title</th>
                            <th scope="col">Sections Count</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUnits()}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProprs(state) {
    return {
        units: state.units
    };
}

export default connect(mapStateToProprs, { fetchUnits, deleteUnit })(AdminSessions);