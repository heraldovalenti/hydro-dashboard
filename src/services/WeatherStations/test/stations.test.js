import { WeatherStationRepository } from '../index';

describe('read weather stations json file', () => {
  it('list stations', async () => {
    const data = await WeatherStationRepository.list();
    expect(data.length).toBe(27);
  });
});
