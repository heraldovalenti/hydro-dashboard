import axios from 'axios';
import config from '../../config';

export const getAuthTokens = async () => {
  const url = `${config.baseURL}${config.api.aes}/authTokens`;
  try {
    const response = await axios({
      url,
      method: 'get',
    });
    return response.data;
  } catch (e) {
    console.error(`Error fetching auth token: ${e}`);
    return {};
  }
};
