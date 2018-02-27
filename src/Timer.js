const SECONDS = 60;
const LIMIT = 99;
const DEFAULT_DURATION = 1;

let _minutes = DEFAULT_DURATION;
let _seconds = 0;
let interval;
let justStruckZero = false;

export const secondsTicker = seconds => {
  switch (seconds) {
    case 0:
      seconds = 59;
      break;
    default:
      seconds--;
  }

  return seconds;
};

export const minutesTicker = (minutes, seconds) => {
  let time;
  let nextSecond = secondsTicker(seconds);

  if (minutes === 0 && seconds === 0) {
    time = 0;
  } else if (minutes === 0 && seconds > 0 ) {
    time = {
      minutes,
      seconds :nextSecond
    };
  } else if (minutes > 0 && seconds === 0) {
    time = {
      minutes: minutes - 1,
      seconds: nextSecond
    };
  } else if (minutes > 0 && seconds > 0) {
    time = {
      minutes,
      seconds: nextSecond
    };
  }

  return time;
};

export const hourTicker = (hrs, minutes, seconds) => {
  // @Todo
  throw new Error('Fail: Implementation is yet to be written');
};

const hasFinished = () => _seconds === 0 && _minutes === 0;

const prettyTime = time => (time > 9 ? time : `0${time}`);

const formatTime = time =>
  `${prettyTime(time.minutes)}:${prettyTime(time.seconds)}`;

const print = val => console.log(val);

const setState = time => {
  _minutes = time.minutes;
  _seconds = time.seconds;
};

const getState = () => ({ minutes: _minutes, seconds: _seconds });

const resetTime = () => clearInterval(interval);

const startTime = () => {
  interval = setInterval(() => {
    if (hasFinished()) {
      clearInterval(interval);
    } else {
      setState(minutesTicker(_minutes, _seconds));
      print(formatTime(getState()));
    }
  }, 1000);
};
