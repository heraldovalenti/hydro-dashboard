import {
  getISODateString,
  getAmericanDateString,
  getDaysApart,
  getWeeksApart,
} from './../date';

import moment from 'moment';

describe('Date', () => {
  describe('getISODateString', () => {
    it('initial time ISO date should be equal to 1970-01-01', () => {
      const initialLocalTimeDate = new Date(0);
      const localDiffMilis = initialLocalTimeDate.getTimezoneOffset() * 60 * 1000;
      const initialTimeDate = new Date(0 + localDiffMilis);
      expect(getISODateString(initialTimeDate)).toEqual('1970-01-01T00:00:00');
    });
  });
  describe('getAmericanDateString', () => {
    it('initial time American date should be equal to Jan 01 1970', () => {
      const initialLocalTimeDate = new Date(0);
      const localDiffMilis = initialLocalTimeDate.getTimezoneOffset() * 60 * 1000;
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
