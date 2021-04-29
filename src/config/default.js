const config = {
  serviceInterceptors: false,
  baseURL: 'https://hydro-dashboard-283320.uc.r.appspot.com',
  api: {
    stations: '/api/stations',
    observations: '/api/observations',
    rainAccumulation: '/api/rain-accumulation',
    exportObservations: '/api/export/observations',
  },
  maps: {
    key: 'AIzaSyCnILw5Ddl2uXfyvFgEtPHTw-su8JlQzA8',
  },
  constants: {
    rainId: 3,
    levelId: 1,
  },
};

export default config;
