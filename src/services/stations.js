import axios from 'axios';
import config from '../config';

export const listStations = async ({ size, page, sort }) => {
  const url = `${config.baseURL}${config.api.stations}`;
  try {
    const response = await axios({
      method: 'get',
      url,
      params: {
        size,
        page,
        sort,
      },
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.warn('Error fetching stations', e);
    return [];
  }
};
