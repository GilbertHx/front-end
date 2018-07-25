import React, { Component } from 'react';
import "./Admin.css";
import Summary from './Summary';
import UsersPie from './Graphs/UsersPie';
import UsersDoughnut from './Graphs/UsersDoughnut';
import Table from './Table';

class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* <h2 className="admin-top-title">Dashboard</h2> */}
                <Summary />
                <div className="row" >
                    <div className="col-sm-6">
                        <div className="pie-doughnut-card card">
                            <UsersDoughnut />
                        </div>
                    </div>
                    <div className="col-sm-6 ">
                        <div className="pie-doughnut-card card">
                            <UsersPie />
                        </div> 
                    </div>
                </div>
                {/* <div className="table-users">
                    <div className="card table-card">
                        <h4 className="table-title">Recent Users</h4>
                        <Table />
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Dashboard;