import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default function(NavComponent) {
  class WithAdminNav extends Component {
    render() {
      return (
        <div className="container-fluid">
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-blue">
            <Link to="/admin/dashboard" className="navbar-brand">Dashboard</Link>
            <button className="navbar-toggler admin-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/admin/users" className="nav-link">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/units" className="nav-link">Units</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/sessions" className="nav-link">Sessions</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/lessons" className="nav-link">Lessons</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/quizzes" className="nav-link">Quizzes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/assessments" className="nav-link">Assessments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/exams" className="nav-link">Exams</Link>
                        </li>
                    </ul>
                    <li className="nav-item admin-site-btn navbar-text">
                        <Link to="/" className="btn">View Site</Link>
                    </li>
                </div>
            </nav>
            <div className="container admin-body">
                <NavComponent {...this.props} />
            </div>
        </div>
      ); 
    }
  }
  return connect(null)(WithAdminNav);
}