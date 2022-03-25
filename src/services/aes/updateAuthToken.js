import axios from 'axios';
import config from '../../config';

export const updateAuthToken = async (token) => {
  const data = { value: token };
  const url = `${config.baseURL}${config.api.aes}/authToken`;
  try {
    const response = await axios({
      url,
      method: 'put',
      data,
    });
    return response.data;
  } catch (e) {
    console.error(`Error updating auth token: ${e}`);
    return {};
  }
};
