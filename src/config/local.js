const config = {
  serviceInterceptors: false,
  baseURL: 'http://aes-local:8080',
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
    rasters: '/rasters',
  },
  rastersURL: 'https://us-central1-hydro-dashboard-283320.cloudfunctions.net',
};

export default config;
