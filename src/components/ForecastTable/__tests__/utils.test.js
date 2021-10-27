import { getAesDateString } from '../../../utils/date';
import { forecastAdapter } from '../utils';

it('should contain all unique dates', () => {
  const { days, forecasts } = forecastAdapter(mockData.forecasts);
  expect(days).toHaveLength(3);
  expect(getAesDateString(days[0])).toBe('01/09/2021');
  expect(getAesDateString(days[1])).toBe('02/09/2021');
  expect(getAesDateString(days[2])).toBe('03/09/2021');
  const { yr, windy } = forecasts;
  expect(yr).toStrictEqual([0.3, null, 0.1]);
  expect(windy).toStrictEqual([0, 0.5, 1.1]);
});

const mockData = {
  id: 572749,
  time: '2021-09-06T02:42:11Z',
  forecasts: [
    {
      id: 572750,
      provider: 'yr',
      details: [
        {
          id: 572751,
          time: '2021-09-01T03:00:00.000Z',
          value: 0.3,
        },
        {
          id: 572752,
          time: '2021-09-03T04:00:00.000Z',
          value: 0.1,
        },
      ],
    },
    {
      id: 572840,
      provider: 'windy',
      details: [
        {
          id: 572753,
          time: '2021-09-01T03:00:00.000Z',
          value: 0.0,
        },
        {
          id: 572754,
          time: '2021-09-02T03:00:00.000Z',
          value: 0.5,
        },
        {
          id: 572755,
          time: '2021-09-03T04:00:00.000Z',
          value: 0.4,
        },
        {
          id: 572756,
          time: '2021-09-03T05:00:00.000Z',
          value: 0.7,
        },
      ],
    },
  ],
};
