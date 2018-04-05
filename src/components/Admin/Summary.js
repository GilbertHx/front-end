import React, { Component } from 'react';

class Summary extends Component {
    render() {
        return (
            <div className="summary">
                <div className="row">
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Total Users</p>
                                <h3 className="summary-card-value total-users">4200</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Staff</p>
                                <h3 className="summary-card-value total-ungraduates">1200</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Students</p>
                                <h3 className="summary-card-value total-graduates">1000</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Graduate</p>
                                <h3 className="summary-card-value total-in-class">2000</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card summary-card">
                            <div className="card-body">
                                <p className="summary-card-title">Still Learning</p>
                                <h3 className="summary-card-value total-target">6000</h3>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;