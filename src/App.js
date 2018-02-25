import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Pomodoro />
      </div>
    );
  }
}

export default App;
