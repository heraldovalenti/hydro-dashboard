export const isWeatherStation = (station) => {
  const rainOrigins = station.stationDataOriginList.filter(
    (o) => o.dimension.id === 3
  );
  return rainOrigins.length > 0;
};

export const levelDimension = 1;
export const flowDimension = 2;
export const rainDimension = 3;

export const isLevelDimension = (id) => id === levelDimension;
export const isFlowDimension = (id) => id === flowDimension;
export const isRainDimension = (id) => id === rainDimension;

export const isHQModelStationDataOrigin = (sdo) => sdo.dataOrigin.id === 7;

export const HQOservation = ({ h, q, precision = 2 }) => {
  if (!h && !q) return '';
  const hText = h ? `H:${h.value.toFixed(precision)}` : '',
    qText = q ? `Q:${q.value.toFixed(precision)}` : '';
  if (!hText) return qText;
  else if (!qText) return hText;
  else return `${hText} ${qText}`;
};
