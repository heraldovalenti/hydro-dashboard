import { StreamRepository } from '../index';

describe('read streams json file', () => {
  it('load streams file', async () => {
    const data = await StreamRepository.list();
    expect(data.length).toBe(119);
  });
});
