import { secondsTicker, minutesTicker } from './Timer';

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
      expect(minutesTicker(0, 0)).toEqual(0);
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
