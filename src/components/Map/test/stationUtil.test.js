import { isWeatherStation } from '../stationUtil';

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
