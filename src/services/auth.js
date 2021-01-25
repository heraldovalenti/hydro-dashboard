import axios from 'axios';

const AUTH_CREDENTIALS_KEY = 'AuthCredentials';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-api-key'] = `${token}`;
  }
};

const loadCredentials = async () => {
  localStorage.getItem(AUTH_CREDENTIALS_KEY);
};

const loadLoginHandler = (credentials) => {
  return axios.interceptors.request.use(
    (config) => {
      config.auth = credentials;
      return config;
    },
    (error) => {
      // Do something with request error
      console.log('loginHandler error: ' + error);
      return Promise.reject(error);
    }
  );
};

const removeLoginHandler = (loginHandler) => {
  axios.interceptors.request.eject(loginHandler);
};

export { setAuthToken, loadLoginHandler, loadCredentials, removeLoginHandler };
