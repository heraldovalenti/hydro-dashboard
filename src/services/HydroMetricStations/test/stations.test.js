import { HydroMetricStationRepository } from '../index';

describe('read hydro metric stations json file', () => {
  it('list stations', async () => {
    const data = await HydroMetricStationRepository.list();
    expect(data.length).toBe(10);
  });
});
