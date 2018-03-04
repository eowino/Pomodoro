export const secondsTicker = (seconds) => {
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
  } else if (minutes === 0 && seconds > 0) {
    time = {
      minutes,
      seconds: nextSecond
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

export const hourTicker = ({ hrs, mins, sec }) => {
  let time;
  let { minutes, seconds } = minutesTicker(mins, sec);
  
  if (hrs === 0 && mins === 0 && sec === 0) {
    time = {
      minutes,
      seconds,
      hours: 0
    };
  } else if (hrs > 0 && mins === 0 && sec === 0) {
    time = {
      hours: hrs - 1,
      minutes: 59,
      seconds: 59
    };
  } else {
    time = {
      hours: hrs,
      minutes,
      seconds
    };
  }

  return time;
};

export const mapInputToTime = (input = '') => {
  let hr = 0, min = 0, sec = 0;
  const i = input;

  switch(i.length) {
    case 1:
      sec = i;
      break;
    case 2:
      sec = i;
      break;
    case 3:
      min = i[0];
      sec = `${i[1]}${i[2]}`;
      break;
    case 4:
      min = `${i[0]}${i[1]}`;
      sec = `${i[2]}${i[3]}`;
      break;
    case 5:
      hr = i[0];
      min = `${i[1]}${i[2]}`;
      sec = `${i[3]}${i[4]}`;
      break;
    case 6:
      hr =  `${i[0]}${i[1]}`;
      min = `${i[2]}${i[3]}`;
      sec = `${i[4]}${i[5]}`;
      break;
    default:
      // default not required 
  }

  return {
    hrs: +hr,
    mins: +min,
    sec: +sec
  }
};

export const mapTimeToInput = ({hours, minutes, seconds} = {}) => {
  let result = 0;

  if (hours === 0 && minutes === 0 && seconds === 0 ) {
    result = '0';
  } else {
    result = `${hours || ''}${minutes || ''}${seconds || ''}`;
  }
  
  return result;
};

export const nextTime = (str) => {
  return mapTimeToInput(
    hourTicker(
      mapInputToTime(str)
    )
  );
};

export default nextTime;