import axios from 'axios';
import config from '../config';

export const hydroBackendApiClient = axios.create({
  baseURL: config.baseURL,
});
