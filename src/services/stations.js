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

const setStationStatus = async (id, status) => {
  const url = `${config.baseURL}${config.api.stations}/${id}/${
    status ? 'activate' : 'deactivate'
  }`;
  try {
    const response = await axios({
      method: 'post',
      url,
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.warn('Error setting station activate status', e);
  }
};

export const activateStation = async (id) => {
  return setStationStatus(id, true);
};

export const deactivateStation = async (id) => {
  return setStationStatus(id, false);
};
