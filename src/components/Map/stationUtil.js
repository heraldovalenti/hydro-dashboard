export const isWeatherStation = (station) => {
  const rainOrigins = station.stationDataOriginList.filter(
    (o) => o.dimension.id === 3
  );
  return rainOrigins.length > 0;
};
