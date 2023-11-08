import axios from 'axios';
import { saveInterception, getInterception } from '../mocks/saveInterception';
import HttpStatus from 'http-status-codes';

export default function initServiceInterceptors() {
  console.log('init interceptors');

  axios.interceptors.response.use(
    (response) => {
      const mockXHR = getInterception({
        url: response.config.url,
        params: response.config.params,
      });
      if (mockXHR) {
        switch (mockXHR.status) {
          case HttpStatus.OK:
          case HttpStatus.CREATED:
            return Promise.resolve(mockXHR.response);
          default:
          // code block
        }
      }
      saveInterception({
        status: response.status,
        response: response,
        url: response.config.url,
        params: response.config.params,
      });
      return response;
    },
    (error) => {
      const mockXHR = getInterception({
        url: error.config.url || error.response.config.url,
        params: error.config.params || error.response.config.params,
      });
      if (mockXHR) {
        switch (mockXHR.status) {
          case HttpStatus.OK:
          case HttpStatus.CREATED:
            return Promise.resolve(mockXHR);
          default:
            return Promise.reject(mockXHR);
        }
      } else {
        saveInterception({
          status: error.response.status,
          response: error.response,
          url: error.response.config.url,
          params: error.response.config.params,
        });
      }

      return Promise.reject(error);
    }
  );
}
