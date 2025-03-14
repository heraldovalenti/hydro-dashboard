import axios from 'axios';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { hydroBackendApiClient } from '../clients/httpClient';

const AUTH_CREDENTIALS_KEY = 'aes-auth-key';
const AUTH_CREDENTIALS_SECRET = 'BD97F625F4DE6275773A8681DCD77B20';

const loadCredentials = async () => {
  const encryptedCredentials = localStorage.getItem(AUTH_CREDENTIALS_KEY);
  if (!encryptedCredentials) {
    return null;
  }
  const credentialsString = AES.decrypt(
    encryptedCredentials,
    AUTH_CREDENTIALS_SECRET
  );
  const credentials = JSON.parse(credentialsString.toString(Utf8));
  return credentials;
};

const persistCredentials = async (credentials) => {
  const credentialsString = JSON.stringify(credentials);
  const encryptedCredentials = AES.encrypt(
    credentialsString,
    AUTH_CREDENTIALS_SECRET
  );
  localStorage.setItem(AUTH_CREDENTIALS_KEY, encryptedCredentials);
};

const destroyCredentials = async () => {
  localStorage.removeItem(AUTH_CREDENTIALS_KEY);
};

const loadAuthHandler = ({ credentials, logout }) => {
  const credentialHandler = hydroBackendApiClient.interceptors.request.use(
    (config) => {
      config.auth = credentials;
      return config;
    },
    (error) => {
      console.log(`credentialHandler error: ${error}`);
      return Promise.reject(error);
    }
  );
  const expirationHandler = hydroBackendApiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.log('wrong credentials, loading authentication form');
        logout(error.response.status);
      }
      return Promise.reject(error);
    }
  );
  return { credentialHandler, expirationHandler };
};

const removeAuthHandler = ({ credentialHandler, expirationHandler }) => {
  hydroBackendApiClient.interceptors.request.eject(credentialHandler);
  hydroBackendApiClient.interceptors.response.eject(expirationHandler);
};

export {
  loadAuthHandler,
  removeAuthHandler,
  loadCredentials,
  persistCredentials,
  destroyCredentials,
};
