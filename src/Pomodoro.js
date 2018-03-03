import React, { Component } from 'react';

import { mapInputToTime, mapTimeToInput, hourTicker } from './Timer'
class Pomodoro extends Component {
  state = {
    value: '',
    running: false,
    interval: null,
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  isNotFull() {
    return this.state.value.length !== 6;
  }

  noVal() {
    return this.state.value.length === 0
  };

  getVal (arr) {
    return (index) => arr[index] || 0;
  };

  handleInputChange = event => {
    const value = event.target.value;
    const notTextInput = event.nativeEvent.inputType !== 'insertText';
    const isNumber = !isNaN(value);
    
    if ((isNumber && this.isNotFull()) || notTextInput) {
      this.setState(() => ({
        value
      }));
    }
  };

  handleStartPause = () => {
    const { running } = this.state;

    this.setState(() => {
      if (running) {
        this.clearInterval();
      } else {
        this.interval = setInterval(() => {
          const nextValue = mapTimeToInput(
            hourTicker(
              mapInputToTime(this.state.value)
            )
          );
          
          this.setState(() => ({
            value: nextValue
          }), () => {
            if (this.state.value === '0') {
              this.handleReset();
            }
          });
        }, 1000);
      }

      return { running: !running }
    });
  };

  handleReset = () => {
    this.clearInterval();
    this.setState(() => ({
      value: '',
      running: false,
    }));
  };

  handlePause = () => {
    
  };
  
  render() {
    const { running, value } = this.state;
    const val = this.getVal(value.split('').reverse());
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
              onFocus={this.handleStartPause}
              type="text"
              className="pomodoro__input sr-only"
              maxLength="6"
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
          <button className="btn btn--start" onClick={this.handleStartPause} disabled={this.noVal()}>
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
