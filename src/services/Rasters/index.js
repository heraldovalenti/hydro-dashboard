import axios from 'axios';

const BASE_URL =
  // 'https://us-central1-hydro-dashboard-283320.cloudfunctions.net/rasters';
  'http://localhost:8083';
export const allRasters = async () => {
  let result = [];
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/all`,
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
      url: `${BASE_URL}/list`,
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
    const url = `${BASE_URL}/get?fileName=${encodeURIComponent(item)}`;
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
