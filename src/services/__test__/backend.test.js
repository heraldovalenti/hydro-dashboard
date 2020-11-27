import config from '../../config';
import { fetchRainData, fetchLevelData, periodForHours } from '../backend';

describe('fetch rain data verification', () => {
  it('basic scenario', async () => {
    console.log(config.baseURL);
    console.log(config.constants.rainId);
    console.log(config.api.rainAccumulation);
    const result = await fetchRainData(27, 24);
    expect(result).toBeDefined();
    console.log(JSON.stringify(result));
  });
});

describe('fetch level data verification', () => {
  it('basic scenario', async () => {
    console.log(config.baseURL);
    console.log(config.constants.rainId);
    console.log(config.api.rainAccumulation);
    const result = await fetchLevelData(27, 24);
    expect(result).toBeDefined();
    console.log(JSON.stringify(result));
  });
});

describe('period for hours verification', () => {
  it('basic scenario', async () => {
    const result = periodForHours(24);
    expect(result).toBeDefined();
    console.log(JSON.stringify(result));
  });
});
