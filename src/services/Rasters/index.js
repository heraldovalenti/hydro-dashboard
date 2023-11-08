import axios from 'axios';
import config from '../../config';

export const rasterTypes = {
  WRF: 'WRF',
  SQPE: 'SQPE',
};

export const allRasters = async ({ type, from, to }) => {
  let result = { fileList: [], total: 0 };
  // return require('./mock.json');
  // return result;
  try {
    const response = await axios({
      method: 'get',
      url: `${config.rastersURL}/all`,
      params: {
        type,
        from,
        to,
      },
    });
    return response.data;
  } catch (e) {
    console.warn(`Error retrieving all rasters data: ${e.toString()}`);
  }
  return result;
};

export const listRasters = async () => {
  let result = { fileList: [], total: 0 };
  try {
    const response = await axios({
      method: 'get',
      url: `${config.rastersURL}/list`,
    });
    result = response.data.fileList.map((fileDescriptor) => {
      const { name, date } = fileDescriptor;
      return { name, date };
    });
  } catch (e) {
    console.warn(`Error retrieving rasters list: ${e.toString()}`);
  }
  return result;
};

export const getRaster = async (item) => {
  let result = [];
  try {
    const url = `${config.rastersURL}/get?fileName=${encodeURIComponent(item)}`;
    const response = await axios({
      method: 'get',
      url,
    });
    result = response.data;
  } catch (e) {
    console.warn(`Error retrieving raster ${item}: ${e.toString()}`);
  }
  return result;
};
