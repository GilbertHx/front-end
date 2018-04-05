import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUnits, deleteUnit } from '../../actions/units_actions';
import NewUnit from './NewUnit';

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
                    <td>{unit.title}</td>
                    <td>{unit.sessions.length}</td>
                    <td><button className="delete-btn" onClick={this.onDelete.bind(this, unit.id)}> <i className="far fa-trash-alt"></i></button></td>
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
                        <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Sessions</th>
                            <th scope="col"></th>
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