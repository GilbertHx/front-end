import React, { Component } from 'react';
import './App.css';
import HomeJumbotron from './HomeJumbotron';
import HomeBody from '../containers/HomeBody';
import Units from './Units';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeJumbotron />
        <HomeBody />
        {
          this.props.authenticated ?
          <Units /> :
          <div></div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);
