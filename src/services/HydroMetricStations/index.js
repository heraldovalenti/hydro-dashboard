import { stations } from './stations';

const HydroMetricStationRepository = {
  list: async () => {
    return stations.map((stationData) => {
      return {
        position: {
          lat: stationData[1],
          lng: stationData[0],
        },
        name: stationData[2],
      };
    });
  },
};
export { HydroMetricStationRepository };
