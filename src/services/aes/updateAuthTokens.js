import axios from 'axios';
import config from '../../config';

export const updateAuthTokens = async ({ fedAuth, rtFa }) => {
  const data = { fedAuth, rtFa };
  const url = `${config.baseURL}${config.api.aes}/authTokens`;
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
