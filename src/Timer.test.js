import {
  secondsTicker,
  minutesTicker,
  hourTicker,
  sanitiseTime,
  mapInputToTime,
  mapTimeToInput,
  nextTime,
} from './Timer';

describe('Seconds lapse test', () => {
  it('should lapse seconds correctly', () => {
    expect(secondsTicker(0)).toEqual(59);
    expect(secondsTicker(1)).toEqual(0);
    expect(secondsTicker(40)).toEqual(39);
    expect(secondsTicker(59)).toEqual(58);
    expect(secondsTicker(10)).toEqual(9);
    expect(secondsTicker(57)).toEqual(56);
  });
});

describe('Minutes lapse test', () => {
  describe('given 0:01', () => {
    it('should evaluate to 0:00', () => {
      expect(minutesTicker(0, 1)).toEqual({ minutes: 0, seconds: 0 });
    });
  });
  describe('given 0:00', () => {
    it('should evaluate to 0:00', () => {
      expect(minutesTicker(0, 0)).toEqual({ minutes: 0, seconds: 0 });
    });
  });
  describe('given 0:59', () => {
    it('should evaluate to 0:58', () => {
      expect(minutesTicker(0, 59)).toEqual({ minutes: 0, seconds: 58 });
    });
  });
  describe('given 0:30', () => {
    it('should evaluate to 0:29', () => {
      expect(minutesTicker(0, 30)).toEqual({ minutes: 0, seconds: 29 });
    });
  });
  describe('given 1:01', () => {
    it('should evaluate to 1:00', () => {
      expect(minutesTicker(1, 1)).toEqual({ minutes: 1, seconds: 0 });
    });
  });
  describe('given 1:00', () => {
    it('should evaluate to 0:59', () => {
      expect(minutesTicker(1, 0)).toEqual({ minutes: 0, seconds: 59 });
    });
  });
  describe('given 23:59', () => {
    it('should evaluate to 23:58', () => {
      expect(minutesTicker(23, 59)).toEqual({ minutes: 23, seconds: 58 });
    });
  });
  describe('given 10:00', () => {
    it('should evaluate to 9:59', () => {
      expect(minutesTicker(10, 0)).toEqual({ minutes: 9, seconds: 59 });
    });
  });
  describe('given 101:00', () => {
    it('should evaluate to 100:59', () => {
      expect(minutesTicker(101, 0)).toEqual({ minutes: 100, seconds: 59 });
    });
  });
});

describe('Hours lapse test', () => {
  describe('given 10:00:01', () => {
    it('should evaluate to 10:00:00', () => {
      expect(
        hourTicker({
          hrs: 10,
          mins: 0,
          sec: 1
        })
      ).toEqual({
        hours: 10,
        minutes: 0,
        seconds: 0
      });
    });
  });
  describe('given 10:00:09', () => {
    it('should evaluate to 10:00:08', () => {
      expect(
        hourTicker({
          hrs: 10,
          mins: 0,
          sec: 9
        })
      ).toEqual({
        hours: 10,
        minutes: 0,
        seconds: 8
      });
    });
  });
  describe('given 05:45:30', () => {
    it('should evaluate to 05:45:29', () => {
      expect(
        hourTicker({
          hrs: 5,
          mins: 45,
          sec: 29
        })
      ).toEqual({
        hours: 5,
        minutes: 45,
        seconds: 28
      });
    });
  });
  describe('given 05:45:00', () => {
    it('should evaluate to 05:44:59', () => {
      expect(
        hourTicker({
          hrs: 5,
          mins: 45,
          sec: 0
        })
      ).toEqual({
        hours: 5,
        minutes: 44,
        seconds: 59
      });
    });
  });
  describe('given 1:00:00', () => {
    it('should evaluate to 00:59:59', () => {
      expect(
        hourTicker({
          hrs: 1,
          mins: 0,
          sec: 0
        })
      ).toEqual({
        hours: 0,
        minutes: 59,
        seconds: 59
      });
    });
  });
  describe('given 20:01:00', () => {
    it('should evaluate to 20:00:59', () => {
      expect(
        hourTicker({
          hrs: 20,
          mins: 1,
          sec: 0
        })
      ).toEqual({
        hours: 20,
        minutes: 0,
        seconds: 59
      });
    });
  });
  describe('given 19:55:45', () => {
    it('should evaluate to 19:55:44', () => {
      expect(
        hourTicker({
          hrs: 19,
          mins: 55,
          sec: 45
        })
      ).toEqual({
        hours: 19,
        minutes: 55,
        seconds: 44
      });
    });
  });
  describe('given 20:00:00', () => {
    it('should evaluate to 19:59:59', () => {
      expect(
        hourTicker({
          hrs: 20,
          mins: 0,
          sec: 0
        })
      ).toEqual({
        hours: 19,
        minutes: 59,
        seconds: 59
      });
    });
  });
  describe('given 05:00:00', () => {
    it('should evaluate to 04:59:59', () => {
      expect(
        hourTicker({
          hrs: 5,
          mins: 0,
          sec: 0
        })
      ).toEqual({
        hours: 4,
        minutes: 59,
        seconds: 59
      });
    });
  });
  describe('given 00:00:01', () => {
    it('should evaluate to 0:00:00', () => {
      expect(
        hourTicker({
          hrs: 0,
          mins: 0,
          sec: 1
        })
      ).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });
  });
  describe('given 00:00:00', () => {
    it('should evaluate to 0:00:00', () => {
      expect(
        hourTicker({
          hrs: 0,
          mins: 0,
          sec: 0
        })
      ).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });
  });
  describe('given 99:00:01', () => {
    it('should evaluate to 98:59:59', () => {
      expect(
        hourTicker({
          hrs: 99,
          mins: 0,
          sec: 1
        })
      ).toEqual({
        hours: 98,
        minutes: 59,
        seconds: 59
      });
    });
  });
});

describe('Sanitise time', () => {
  test('99 should return 55 ', () => {
    expect(sanitiseTime('99')).toEqual('59');
  });
  test('199 should return 159 ', () => {
    expect(sanitiseTime('199')).toEqual('159');
  });
  test('6000 should return 10000 ', () => {
    expect(sanitiseTime('6000')).toEqual('10000');
  });
  test('9499 should return 5459 ', () => {
    expect(sanitiseTime('9499')).toEqual('5459');
  });
  test('19499 should return 15459 ', () => {
    expect(sanitiseTime('19499')).toEqual('15459');
  });
  test('919499 should return 915459 ', () => {
    expect(sanitiseTime('919499')).toEqual('915459');
  });
  test('916499 should return 915459 ', () => {
    expect(sanitiseTime('916499')).toEqual('915459');
  });
  test('915469 should return 915459 ', () => {
    expect(sanitiseTime('915469')).toEqual('915459');
  });
});

describe('Map input to time', () => {
  expect(mapInputToTime('1')).toEqual({hrs: 0, mins: 0, sec: 1});
  expect(mapInputToTime('59')).toEqual({hrs: 0, mins: 0, sec: 59});
  expect(mapInputToTime('159')).toEqual({hrs: 0, mins: 1, sec: 59});
  expect(mapInputToTime('1959')).toEqual({hrs: 0, mins: 19, sec: 59});
  expect(mapInputToTime('71959')).toEqual({hrs: 7, mins: 19, sec: 59});
  expect(mapInputToTime('751959')).toEqual({hrs: 75, mins: 19, sec: 59});
});

describe('Map time to input', () => {
  expect(mapTimeToInput({hours: 0, minutes: 0, seconds: 1})).toEqual('1');
  expect(mapTimeToInput({hours: 0, minutes: 0, seconds: 59})).toEqual('59');
  expect(mapTimeToInput({hours: 0, minutes: 1, seconds: 59})).toEqual('159');
  expect(mapTimeToInput({hours: 0, minutes: 19, seconds: 59})).toEqual('1959');
  expect(mapTimeToInput({hours: 7, minutes: 19, seconds: 59})).toEqual('71959');
  expect(mapTimeToInput({hours: 75, minutes: 19, seconds: 59})).toEqual('751959');
});

describe('Next time', () => {
  expect(nextTime('1')).toEqual('0');
  expect(nextTime('2')).toEqual('1');
  expect(nextTime('59')).toEqual('58');
  expect(nextTime('159')).toEqual('158');
  expect(nextTime('1959')).toEqual('1958');
  expect(nextTime('71959')).toEqual('71958');
  expect(nextTime('751959')).toEqual('751958');
  expect(nextTime('2000')).toEqual('1959');
});