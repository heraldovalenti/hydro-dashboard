import { LatestData } from '../index';
describe('Wundermap retrieve tests', () => {
  it('basic retrieve test', async () => {
    const results = await LatestData.list();
    expect(results.length).toBe(6);
    console.log(`results=${JSON.stringify(results)}`);
    const dates = results.map((result) => result.date);
    const values = results.map((result) => result.value);
    expect([...new Set(dates)].length).toBeGreaterThan(1);
    expect([...new Set(values)].length).toBeGreaterThan(1);
  });
});
