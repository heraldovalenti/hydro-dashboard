import axios from 'axios';
import config from '../../config';

export const rasterTypes = {
  WRF: 'WRF',
  SQPE: 'SQPE',
  ACUM: 'ACUM',
};

export const allRasters = async ({ type, from, to }) => {
  const result = { fileList: [], total: 0 };
  const url = `${config.rastersURL}${config.api.rasters}/all`;
  try {
    const response = await axios({
      method: 'get',
      url,
      params: {
        type,
        from,
        to,
      },
    });
    return response.data;
  } catch (e) {
    console.warn('Error retrieving all rasters data', e);
  }
  return result;
};

export const listRasters = async () => {
  let result = { fileList: [], total: 0 };
  try {
    const response = await axios({
      method: 'get',
      url: `${config.rastersURL}${config.api.rasters}/list`,
    });
    result = response.data.fileList.map((fileDescriptor) => {
      const { name, date } = fileDescriptor;
      return { name, date };
    });
  } catch (e) {
    console.warn('Error retrieving rasters list', e);
  }
  return result;
};

export const getRaster = async (item) => {
  let result = [];
  try {
    const url = `${config.rastersURL}${
      config.api.rasters
    }/get?fileName=${encodeURIComponent(item)}`;
    const response = await axios({
      method: 'get',
      url,
    });
    result = response.data;
  } catch (e) {
    console.warn(`Error retrieving raster ${item}`, e);
  }
  return result;
};
