export const isWeatherStation = (station) => {
  const rainOrigins = station.stationDataOriginList.filter(
    (o) => o.dimension.id === 3
  );
  return rainOrigins.length > 0;
};

export const isLevelDimension = (id) => id === 1;
export const isFlowDimension = (id) => id === 2;
export const isRainDimension = (id) => id === 3;

export const isHQModelStationDataOrigin = (sdo) => sdo.dataOrigin.id === 7;
