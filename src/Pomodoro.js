import React, { Component } from 'react';

class Pomodoro extends Component {
  state = {
    value: '',
    running: false,
    interval: null,
    minutes: 0,
    seconds: 0
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleInputChange = event => {
    const value = event.target.value;

    if (!isNaN(value)) {
      this.setState(() => ({
        value
      }));
    }
  };

  handleStart = () => {
    console.log('start');
  };

  handleReset = () => {
    clearInterval(this.state.interval);
    this.setState(() => ({
      value: ''
    }));
  };

  render() {
    const { running } = this.state;
    return (
      <div className="pomodoro">
        <h1 className="pomodoro__title">Timer</h1>
        <div className="pomodoro__body">
          <label>
            <span className="sr-only">How long would you like?</span>
            <input
              value={this.state.value}
              onChange={this.handleInputChange}
              type="text"
              className="pomodoro__input"
              placeholder="00h 00m 00s"
            />
          </label>
        </div>
        <div className="pomodoro__footer">
          <button className="btn btn--start" onClick={this.handleStart}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn--reset" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
