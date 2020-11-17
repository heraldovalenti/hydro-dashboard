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
