import axios from 'axios';
import config from '../../config';

export const allRasters = async () => {
  let result = [];
  // return require('./mock.json');
  // return result;
  try {
    const response = await axios({
      method: 'get',
      url: `${config.rastersURL}/all`,
    });
    return response.data;
  } catch (e) {
    console.error(`Error retrieving all rasters data: ${e.toString()}`);
  }
  return result;
};

export const listRasters = async () => {
  let result = [];
  try {
    const response = await axios({
      method: 'get',
      url: `${config.rastersURL}/list`,
    });
    result = response.data.map((fileDescriptor) => {
      const { name, date } = fileDescriptor;
      return { name, date };
    });
  } catch (e) {
    console.error(`Error retrieving rasters list: ${e.toString()}`);
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
    console.error(`Error retrieving raster ${item}: ${e.toString()}`);
  }
  return result;
};
