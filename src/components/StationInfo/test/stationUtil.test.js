import { isWeatherStation, HQOservation } from '../stationUtil';

describe('station util tests', () => {
  describe('isWeatherStation verification', () => {
    it('is a weather station when it contains a data origin for rain (id = 3)', () => {
      const station = {
        stationDataOriginList: [
          {
            dimension: {
              id: 3,
            },
          },
        ],
      };
      expect(isWeatherStation(station)).toBeTruthy();
    });
    it('is NOT a weather station when it does not contain a data origin for rain (id = 3)', () => {
      const station = {
        stationDataOriginList: [
          {
            dimension: {
              id: 1,
            },
          },
        ],
      };
      expect(isWeatherStation(station)).toBeFalsy();
    });
    it('is NOT a weather station when it does not contain any data origin', () => {
      const station = {
        stationDataOriginList: [],
      };
      expect(isWeatherStation(station)).toBeFalsy();
    });
  });

  describe('hq observation text', () => {
    it('when both H and Q provided, text includes both dimensions truncated to default', () => {
      const result = HQOservation({
        h: { value: 11.111 },
        q: { value: 22.2222 },
      });
      expect(result).toBe('H:11.11 Q:22.22');
    });

    it('when only H provided, text includes only H', () => {
      const result = HQOservation({ h: { value: 11.111 } });
      expect(result).toBe('H:11.11');
    });

    it('when only Q provided, text includes only Q', () => {
      const result = HQOservation({ q: { value: 22.2222 } });
      expect(result).toBe('Q:22.22');
    });

    it('H, Q and precision provided', () => {
      const result = HQOservation({
        h: { value: 11.111 },
        q: { value: 22.2222 },
        precision: 3,
      });
      expect(result).toBe('H:11.111 Q:22.222');
    });

    it('empty when H nor Q are provided', () => {
      const result = HQOservation({});
      expect(result).toBe('');
    });
  });
});
