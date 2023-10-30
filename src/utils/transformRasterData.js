export const transformRasterData = (
  initPosition,
  endPosition,
  { Data, Height, Width }
) => {
  const { lat: initLat, lng: initLng } = initPosition;
  const { lat: endLat, lng: endLng } = endPosition;
  const widthDiff = endLng - initLng;
  const heightDiff = endLat - initLat;
  const points = Data.map((pointValue, index) => {
    const row1 = Math.floor(index / Width);
    const col2 = index % Width;
    const lat = initLat + row1 * (heightDiff / Height);
    const lng = initLng + col2 * (widthDiff / Width);
    return { weight: pointValue, lat, lng };
  });
  return points;
};
