import {
  getISODateString,
  getAmericanDateString,
  getDaysApart,
  getWeeksApart,
  localToUTC,
  isValidDate,
  isSameDay,
  roundToMinutes,
} from './../date';

import moment from 'moment';

describe('Date', () => {
  describe('getISODateString', () => {
    it('initial time ISO date should be equal to 1970-01-01', () => {
      const initialLocalTimeDate = new Date(0);
      const localDiffMilis =
        initialLocalTimeDate.getTimezoneOffset() * 60 * 1000;
      const initialTimeDate = new Date(0 + localDiffMilis);
      expect(getISODateString(initialTimeDate)).toEqual('1970-01-01T00:00:00');
    });
  });
  describe('getAmericanDateString', () => {
    it('initial time American date should be equal to Jan 01 1970', () => {
      const initialLocalTimeDate = new Date(0);
      const localDiffMilis =
        initialLocalTimeDate.getTimezoneOffset() * 60 * 1000;
      const initialTimeDate = new Date(0 + localDiffMilis);
      expect(getAmericanDateString(initialTimeDate)).toEqual(
        'Jan 01 1970 00:00'
      );
    });
  });

  describe('getDaysApart', () => {
    it('should be 31 days apart', () => {
      const aDate = moment('01/01/2020');
      const bDate = moment('02/01/2020');
      expect(getDaysApart(aDate, bDate)).toEqual(31);
    });
  });

  describe('getWeeksApart', () => {
    it('should be 4 weeks appart', () => {
      const aDate = moment('01/01/2020');
      const bDate = moment('02/01/2020');
      expect(getWeeksApart(aDate, bDate)).toEqual(4);
    });
  });
});

describe('localToUTC verification', () => {
  it('should be 3 hours', () => {
    const now = moment();
    console.log(getISODateString(now));
    console.log(getISODateString(localToUTC(now)));
  });
});

describe('is valid date verification', () => {
  it('show be valid for a valid date', () => {
    const now = new Date();
    expect(isValidDate(now)).toBeTruthy();
    const first2021Day = moment('01/01/2021').toDate();
    expect(isValidDate(first2021Day)).toBeTruthy();
  });

  it('show be NOT valid for not valid date', () => {
    const invalid = new Date('');
    expect(isValidDate(invalid)).toBeFalsy();
  });

  it('show be NOT valid for undefined, object, string or number', () => {
    expect(isValidDate(undefined)).toBeFalsy();
    expect(isValidDate({})).toBeFalsy();
    expect(isValidDate(0)).toBeFalsy();
    expect(isValidDate('foo')).toBeFalsy();
  });
});

describe('same day verification', () => {
  it('should be the same day for 3am and 4am', () => {
    const d1 = '2021-09-03T03:00:00.000Z';
    const d2 = '2021-09-03T04:00:00.000Z';
    expect(isSameDay(d1, d2));
  });
  it('should be the same day for 0am and 3am', () => {
    const d1 = '2021-09-03T00:00:00.000Z';
    const d2 = '2021-09-03T03:00:00.000Z';
    expect(isSameDay(d1, d2));
  });
});

describe('round time verification', () => {
  it('should round up to 04:10 when is 04:06', () => {
    const date = '2023-03-27T04:06:02.001Z';
    const actual = roundToMinutes(date);
    expect(actual.toISOString()).toBe('2023-03-27T04:10:00.000Z');
  });
  it('should round up to 04:20 when is 04:11', () => {
    const date = '2023-03-27T04:11:02.001Z';
    const actual = roundToMinutes(date);
    expect(actual.toISOString()).toBe('2023-03-27T04:20:00.000Z');
  });
  it('should round up to 05:00 when is 04:52', () => {
    const date = '2023-03-27T04:52:02.001Z';
    const actual = roundToMinutes(date);
    expect(actual.toISOString()).toBe('2023-03-27T05:00:00.000Z');
  });
  it('should round up to next day at 00:00 when is 23:52', () => {
    const date = '2023-03-27T23:52:02.001Z';
    const actual = roundToMinutes(date);
    expect(actual.toISOString()).toBe('2023-03-28T00:00:00.000Z');
  });
  it('should round down to 04:00 when is 04:06 with round to -10 minutes', () => {
    const date = '2023-03-27T04:06:02.001Z';
    const actual = roundToMinutes(date, -10);
    expect(actual.toISOString()).toBe('2023-03-27T04:00:00.000Z');
  });
  it('should round down to 04:10 when is 04:17 with round to -10 minutes', () => {
    const date = '2023-03-27T04:17:02.001Z';
    const actual = roundToMinutes(date, -10);
    expect(actual.toISOString()).toBe('2023-03-27T04:10:00.000Z');
  });
  it('should round up to 05:00 when is 04:52 with round to 15 minutes', () => {
    const date = '2023-03-27T04:52:02.001Z';
    const actual = roundToMinutes(date, 15);
    expect(actual.toISOString()).toBe('2023-03-27T05:00:00.000Z');
  });
  it('should round down to 04:45 when is 04:56 with round to -15 minutes', () => {
    const date = '2023-03-27T04:56:02.001Z';
    const actual = roundToMinutes(date, -15);
    expect(actual.toISOString()).toBe('2023-03-27T04:45:00.000Z');
  });
});
