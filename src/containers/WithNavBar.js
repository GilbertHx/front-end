import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

export default function(NavComponent) {
  class WithNav extends Component {
    render() {
      return (
          <div>
            <NavBar />
            <NavComponent {...this.props} />
          </div>
      ); 
    }
  }
  return connect(null)(WithNav);
}