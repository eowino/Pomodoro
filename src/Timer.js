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
    time = {
      minutes: 0,
      seconds: 0
    };
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

export const hourTicker = (hrs, mins, sec) => {
  let time;
  let { minutes, seconds } = minutesTicker(mins, sec);
  if (hrs === 0 && mins === 0 && sec === 0) {
    time = {
      minutes,
      seconds,
      hours: 0
    }
  } else if (hrs > 0 && mins === 0 && sec === 0) {
    time = {
      hours: hrs - 1,
      minutes: 59,
      seconds: 59
    }
  } else {
    time = {
      hours: hrs,
      minutes,
      seconds
    }
  }

  return time;
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
