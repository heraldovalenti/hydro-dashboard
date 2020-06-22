import axios from 'axios';
import { saveInterception, getInterception } from '../mocks/saveInterception';
import HttpStatus from 'http-status-codes';

export default function initServiceInterceptors() {
  console.log('init interceptors');
  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {}
  );

  axios.interceptors.response.use(
    (response) => {
      const mockXHR = getInterception(response.config.url);
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
        path: response.config.url,
      });
      return response;
    },
    (error) => {
      const mockXHR = getInterception(
        error.config.url || error.response.config.url
      );
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
          path: error.response.config.url,
        });
      }

      return Promise.reject(error);
    }
  );
}
