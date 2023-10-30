import { listRasters } from '.';

test('list raster test', async () => {
  const list = await listRasters();
  expect(list).toHaveLength(3);
}, 20_000);
