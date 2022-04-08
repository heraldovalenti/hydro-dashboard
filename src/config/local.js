const config = {
  serviceInterceptors: false,
  baseURL: 'http://localhost:8080',
  api: {
    basins: '/api/basin',
    stations: '/api/stations',
    observations: '/api/observations',
    latestObservations: '/api/observations/latestObservations',
    rainAccumulation: '/api/rain-accumulation',
    exportObservations: '/api/export/observations',
    forecast: '/api/forecast',
    forecastRefresh: '/api/forecast/refresh',
    aes: '/api/aes',
    healthCheck: '/api/health-check',
  },
  maps: {
    key: 'AIzaSyCnILw5Ddl2uXfyvFgEtPHTw-su8JlQzA8',
  },
  constants: {
    rainId: 3,
    levelId: 1,
  },
  rastersURL:
    'https://us-central1-hydro-dashboard-283320.cloudfunctions.net/rasters',
};

export default config;
