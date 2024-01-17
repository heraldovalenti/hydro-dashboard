import config from '../config';

export const getSdoDescriptorForStation = (station) => {
  const sdosById = {};
  const sdos = config.constants.sdo;
  for (const sdoKey of Object.keys(sdos)) {
    const sdo = sdos[sdoKey];
    const { id } = sdo;
    sdosById[id] = sdo;
  }
  const { stationDataOriginList } = station;
  for (const sdo of stationDataOriginList) {
    const {
      dataOrigin: { id },
    } = sdo;
    if (sdosById[id]) {
      return sdosById[id];
    }
  }
};

export const getSdoForDescriptor = (station, sdoDescriptor) => {
  const { stationDataOriginList } = station;
  const stationSdo = stationDataOriginList.find(
    (sdoItem) => sdoItem.dataOrigin.id === sdoDescriptor.id
  );
  return stationSdo;
};

export const buildSdoLink = (station, sdoDescriptor) => {
  const stationSdo = getSdoForDescriptor(station, sdoDescriptor);
  if (!stationSdo) return;
  return sdoDescriptor.link.replace(
    sdoDescriptor.externalIdPlaceholder,
    stationSdo.externalStationId
  );
};
