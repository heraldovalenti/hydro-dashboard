const config = {
  serviceInterceptors: false,
  baseURL: 'https://hydro-dashboard-2021-q3.uc.r.appspot.com',
  api: {
    stations: '/api/stations',
    observations: '/api/observations',
    latestObservations: '/api/observations/latestObservations',
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
