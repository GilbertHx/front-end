import React, { Component } from 'react';
import './App.css';
import HomeJumbotron from '../containers/HomeJumbotron';
import HomeBody from '../containers/HomeBody';
import Units from './Units';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeJumbotron />
        <HomeBody />
        <Units />
      </div>
    );
  }
}
  
export default App;
