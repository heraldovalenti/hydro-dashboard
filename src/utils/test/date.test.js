import {
  getISODateString,
  getAmericanDateString,
  getDaysApart,
  getWeeksApart,
  localToUTC,
  isValidDate,
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
