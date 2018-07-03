import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class IsStaff extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      if (this.props.is_staff !== true) {
        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (this.props.is_staff !== true) {
        this.context.router.history.push('/login');
      }
    }
    
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { 
            authenticated: state.auth.authenticated,
            is_staff: state.auth.is_staff
        };
  }

  return connect(mapStateToProps)(IsStaff);
}