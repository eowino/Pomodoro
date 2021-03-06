import React, { Component } from 'react';

import nextTime, { sanitiseTime } from './Timer'

class Pomodoro extends Component {
  state = {
    value: '500',
    running: false,
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
  
  isNumber(str) {
    return !isNaN(str);
  }
  
  handleInputChange = event => {
    const value = event.target.value;
    const notTextInput = event.nativeEvent.inputType !== 'insertText';
    
    if ((this.isNumber(value) && this.isNotFull()) || notTextInput) {
      this.setState(() => ({
        value
      }));
    }
  };
  
  handleStart = () => {
    const { running, value } = this.state;
    
    if (!this.isNumber(value)) {
      this.handleReset();
      return;
    }
    
    this.setState(() => {
      if (running) {
        this.clearInterval();
      } else {
        this.interval = setInterval(() => {
          const nextValue = nextTime(this.state.value);
          
          this.setState(() => ({
            value: nextValue
          }), () => {
            if (this.state.value === '0') {
              this.handleReset();
              this.audio.play();
            }
          });
        }, 1000);
      }
      
      return { running: !running }
    });
  };  
  
  handleReset = () => {
    this.clearInterval();
    this.audio.pause();
    this.setState(() => ({
      value: '',
      running: false,
    }));
  };
  
  handlePause = () => {
    const { running } = this.state;

    if (running) {
      this.clearInterval();
      this.setState({
        running: !this.state.running
      });
    }
  };

  handleInvalidTime = () => {
    const { value } = this.state;

    if (this.isNumber(value)) {
      this.setState({
        value: sanitiseTime(value)
      });
    }
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
              ref={(ref) => this.input = ref}
              value={this.state.value}
              onChange={this.handleInputChange}
              onFocus={this.handlePause}
              onBlur={this.handleInvalidTime}
              type="text"
              className="pomodoro__input sr-only"
              maxLength="6"
              dir="rtl"
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
          <button className="btn btn--start" onClick={this.handleStart} disabled={this.noVal()}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn--reset" onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <audio ref={ref => this.audio = ref} loop="loop">
          <source src="https://freesound.org/data/previews/263/263133_2064400-lq.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default Pomodoro;
