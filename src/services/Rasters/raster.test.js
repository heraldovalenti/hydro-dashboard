import { listRasters } from '.';

test.skip('list raster test', async () => {
  const list = await listRasters();
  expect(list).toHaveLength(156);
}, 20_000);
