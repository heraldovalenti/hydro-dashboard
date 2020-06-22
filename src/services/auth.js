import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-api-key'] = `${token}`;
  }
};

export { setAuthToken };
