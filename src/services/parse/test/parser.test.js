import { readData, parseData, dumpData } from '../parser';
describe('load and parse data from streams.dat file', () => {
  const fileName = 'streams.dat';
  it('load streams file', async () => {
    const data = await readData(fileName);
    expect(data.length).toBe(119);
    expect(data[0].length).toBe(20);
    expect(data[data.length - 1].length).toBe(865);
  });

  it('parse streams data', async () => {
    const data = await readData(fileName);
    const riverbeds = await parseData(data);
    expect(riverbeds.length).toBe(119);
    const riverbed = riverbeds[0];
    expect(riverbed[0].lat).toBe(-25.809885025);
    expect(riverbed[0].lng).toBe(-65.6903915405);
  });

  it('streams dump', async () => {
    await dumpData(fileName);
  });
});

describe('load and parse data from cabra-corral-basin.dat file', () => {
  const fileName = 'cabra-corral-basin.dat';
  it('load basin file', async () => {
    const data = await readData(fileName);
    expect(data.length).toBe(12);
    expect(data[0].length).toBe(2700);
    expect(data[data.length - 1].length).toBe(3995);
  });

  it('parse basin data', async () => {
    const data = await readData(fileName);
    const basins = await parseData(data);
    expect(basins.length).toBe(12);
    const basin = basins[0];
    expect(basin[0].lat).toBe(-24.4165287228);
    expect(basin[0].lng).toBe(-66.1615648129);
  });

  it('basin dump', async () => {
    await dumpData(fileName);
  });
});

describe('load and parse data from tunal-basin.dat file', () => {
  const fileName = 'tunal-basin.dat';
  it('load basin file', async () => {
    const data = await readData(fileName);
    expect(data.length).toBe(6);
    expect(data[0].length).toBe(3221);
    expect(data[data.length - 1].length).toBe(6);
  });

  it('parse basin data', async () => {
    const data = await readData(fileName);
    const basins = await parseData(data);
    expect(basins.length).toBe(6);
    const basin = basins[0];
    expect(basin[0].lat).toBe(-25.0275415315);
    expect(basin[0].lng).toBe(-64.88273674);
  });

  it('basin dump', async () => {
    await dumpData(fileName);
  });
});
