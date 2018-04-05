import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default function(NavComponent) {
  class TopBar extends Component {
    render() {
      return (
          <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 lessons-top-bar-brand">
                        <Link to="/" className="navbar-brand">TryE-Learning</Link>
                    </div>
                </div>
            </div>
            <NavComponent {...this.props} />
          </div>
      ); 
    }
  }
  return connect(null)(TopBar);
}