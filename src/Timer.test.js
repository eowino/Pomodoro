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
});

describe('Sanitise time', () => {
  test('99 should return 55 ', () => {
    expect(sanitiseTime('99')).toEqual('59');
  });
  test('199 should return 159 ', () => {
    expect(sanitiseTime('199')).toEqual('159');
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