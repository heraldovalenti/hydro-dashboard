import axios from 'axios';
import config from '../../config';

export const updateAesObservations = async () => {
  const url = `${config.baseURL}${config.api.observations}/updateAesObservations`;
  try {
    const response = await axios({
      url,
      method: 'get',
    });
    return response.data;
  } catch (e) {
    console.error(`Error updating AES observations: ${e}`);
    throw e;
  }
};
