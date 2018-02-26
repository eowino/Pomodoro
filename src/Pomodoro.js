import React, { Component } from 'react';

class Pomodoro extends Component {
  state = {
    value: '',
    running: false,
    interval: null,
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  isFull = () =>  this.state.value.length > 6;

  handleInputChange = event => {
    const value = event.target.value;

    if (!isNaN(value) && !this.isFull()) {
      this.setState(() => ({
        value
      }));
    }
  };

  handleKeyDown = (event) => {
    const BACKSPACE = 8;
    const keycode = event.nativeEvent.keyCode;
    const value = this.state.value;

    if (this.isFull() && keycode === BACKSPACE) {
      this.setState(() => ({
        value: value.substring(0, value.length - 1)
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

  getVal = (arr) => (index) => arr[index] || 0;
  
  render() {
    const { running, value } = this.state;
    const val = this.getVal(value.split(''));
    const valid = 'pomodoro__valid';

    return (
      <div className="pomodoro">
        <h1 className="pomodoro__title">Timer</h1>
        <div className="pomodoro__body">
          <label>
            <span className="sr-only">How long would you like?</span>
            <input
              value={this.state.value}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              type="text"
              className="pomodoro__input sr-only"
            />
            <span className="pomodoro__text-area">
              <span className={val(5) ? valid : null}>{val(5)}</span>
              <span className={val(4) ? valid : null}>{val(4)}</span>
              <span className="pomodoro__unit">h</span>
              <span className={val(3) ? valid : null}>{val(3)}</span>
              <span className={val(2) ? valid : null}>{val(2)}</span>
              <span className="pomodoro__unit">m</span>
              <span className={val(1) ? valid : null}>{val(1)}</span>
              <span className={val(0) ? valid : null}>{val(0)}</span>
              <span className="pomodoro__unit">s</span>
            </span>
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
