import axios from 'axios';
import config from '../../config';

export const latestDataHealthCheck = async () => {
  const url = `${config.baseURL}${config.api.healthCheck}/latestData`;
  try {
    const response = await axios({
      url,
      method: 'get',
    });
    return response.data;
  } catch (e) {
    console.error(`Error performing health check: ${e}`);
    throw e;
  }
};
