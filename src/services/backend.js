import axios from 'axios';
import config from '../config';

export const fetchStations = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.stations}`,
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.log(`Error fetching stations: ${e}`);
    return [];
  }
};

export const fetchRainAccumulatedData = async (stationId, hours) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.observations}/${stationId}/accumulated`,
      params: { hours },
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.log(`Error fetching station accumulated data: ${e}`);
    return {};
  }
};
