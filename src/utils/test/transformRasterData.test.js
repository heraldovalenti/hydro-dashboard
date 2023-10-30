import { transformRasterData } from '../transformRasterData';

describe('transformRasterData verification', () => {
  const dummyInit = { lat: 0, lng: 0 },
    dummyEnd = { lat: -1, lng: 1 },
    realInit = { lat: -23, lng: -67 },
    realEnd = { lat: -28, lng: -63.5 },
    zeroData = { Data: [], Height: 0, Width: 0 },
    twoByTwoData = { Data: [1, 2, 3, 4], Height: 2, Width: 2 },
    twoByThreeData = { Data: [1, 2, 3, 4, 5, 6], Height: 2, Width: 3 },
    threeByThreeData = {
      Data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      Height: 3,
      Width: 3,
    };
  const oneThird = 1 / 3,
    twoThird = 2 / 3;
  const { lat: initLat, lng: initLng } = realInit;
  const { lat: endLat, lng: endLng } = realEnd;
  const latDiff = endLat - initLat;
  const lngDiff = endLng - initLng;

  it('empty points set when no data', () => {
    expect(transformRasterData(dummyInit, dummyInit, zeroData).length).toBe(0);
  });

  it('2x2 positions when 4 data points with dummy init/end', () => {
    const result = transformRasterData(dummyInit, dummyEnd, twoByTwoData);
    expect(result.length).toBe(4);
    const [p1, p2, p3, p4] = result;
    expect(p1).toStrictEqual({ lat: 0, lng: 0, weight: 1 });
    expect(p2).toStrictEqual({ lat: 0, lng: 0.5, weight: 2 });
    expect(p3).toStrictEqual({ lat: -0.5, lng: 0, weight: 3 });
    expect(p4).toStrictEqual({ lat: -0.5, lng: 0.5, weight: 4 });
  });

  it('2x2 positions when 4 data points with real init/end', () => {
    const result = transformRasterData(realInit, realEnd, twoByTwoData);
    expect(result.length).toBe(4);
    const [p1, p2, p3, p4] = result;
    const r1 = -23,
      r2 = r1 + 0.5 * latDiff;
    const c1 = -67,
      c2 = c1 + 0.5 * lngDiff;
    expect(p1).toStrictEqual({ lat: r1, lng: c1, weight: 1 });
    expect(p2).toStrictEqual({ lat: r1, lng: c2, weight: 2 });
    expect(p3).toStrictEqual({ lat: r2, lng: c1, weight: 3 });
    expect(p4).toStrictEqual({ lat: r2, lng: c2, weight: 4 });
  });

  it('3x3 positions when 9 data points with dummy init/end', () => {
    const result = transformRasterData(dummyInit, dummyEnd, threeByThreeData);
    expect(result.length).toBe(9);
    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = result;
    expect(p1).toStrictEqual({ lat: 0, lng: 0, weight: 1 });
    expect(p2).toStrictEqual({ lat: 0, lng: oneThird, weight: 2 });
    expect(p3).toStrictEqual({ lat: 0, lng: twoThird, weight: 3 });

    expect(p4).toStrictEqual({ lat: -oneThird, lng: 0, weight: 4 });
    expect(p5).toStrictEqual({ lat: -oneThird, lng: oneThird, weight: 5 });
    expect(p6).toStrictEqual({ lat: -oneThird, lng: twoThird, weight: 6 });

    expect(p7).toStrictEqual({ lat: -twoThird, lng: 0, weight: 7 });
    expect(p8).toStrictEqual({ lat: -twoThird, lng: oneThird, weight: 8 });
    expect(p9).toStrictEqual({ lat: -twoThird, lng: twoThird, weight: 9 });
  });

  it('3x3 positions when 9 data points with real init/end', () => {
    const result = transformRasterData(realInit, realEnd, threeByThreeData);
    expect(result.length).toBe(9);
    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = result;
    const r1 = -23,
      r2 = r1 + oneThird * latDiff,
      r3 = r1 + twoThird * latDiff;
    const c1 = -67,
      c2 = c1 + oneThird * lngDiff,
      c3 = c1 + twoThird * lngDiff;

    expect(p1).toStrictEqual({ lat: r1, lng: c1, weight: 1 });
    expect(p2).toStrictEqual({ lat: r1, lng: c2, weight: 2 });
    expect(p3).toStrictEqual({ lat: r1, lng: c3, weight: 3 });

    expect(p4).toStrictEqual({ lat: r2, lng: c1, weight: 4 });
    expect(p5).toStrictEqual({ lat: r2, lng: c2, weight: 5 });
    expect(p6).toStrictEqual({ lat: r2, lng: c3, weight: 6 });

    expect(p7).toStrictEqual({ lat: r3, lng: c1, weight: 7 });
    expect(p8).toStrictEqual({ lat: r3, lng: c2, weight: 8 });
    expect(p9).toStrictEqual({ lat: r3, lng: c3, weight: 9 });
  });

  it('2x3 positions when 9 data points with dummy init/end', () => {
    const result = transformRasterData(dummyInit, dummyEnd, twoByThreeData);
    expect(result.length).toBe(6);
    const [p1, p2, p3, p4, p5, p6] = result;
    expect(p1).toStrictEqual({ lat: 0, lng: 0, weight: 1 });
    expect(p2).toStrictEqual({ lat: 0, lng: oneThird, weight: 2 });
    expect(p3).toStrictEqual({ lat: 0, lng: twoThird, weight: 3 });

    expect(p4).toStrictEqual({ lat: -0.5, lng: 0, weight: 4 });
    expect(p5).toStrictEqual({ lat: -0.5, lng: oneThird, weight: 5 });
    expect(p6).toStrictEqual({ lat: -0.5, lng: twoThird, weight: 6 });
  });
});
