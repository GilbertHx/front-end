import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default function(NavComponent) {
  class SideNav extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    renderSideNav() {
        if (this.state.collapse  === true) {
            return <div></div>
        } else {
            return (
                <div className="col-lg-2" >
                    <nav className="nav flex-column lesson-nav-bar-color">
                        <div className="sidebar-header">
                            <h3>Collapsible Sidebar</h3>
                        </div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/users" className="nav-link">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/courses" className="nav-link">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/lessons" className="nav-link">Lessons</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/exercise" className="nav-link">Exercise</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/exam" className="nav-link">Exam</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="container-fluid">
            <div className="row">
                {this.renderSideNav()}
                <div className="col-lg-10 no-paddin">
                    <div onClick={this.toggle.bind(this)}>Nav</div>
                    <NavComponent {...this.props} />
                </div>
            </div>
        </div>
      ); 
    }
  }
  return connect(null)(SideNav);
}