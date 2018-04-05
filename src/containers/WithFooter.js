import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

export default function(NavComponent) {
  class WithFooter extends Component {
    render() {
      return (
          <div>
            <NavComponent {...this.props} />
            <Footer />
          </div>
      ); 
    }
  }
  return connect(null)(WithFooter);
}