const config = {
  serviceInterceptors: false,
  baseURL: 'https://hydro-dashboard-283320.uc.r.appspot.com',
  api: {
    basins: '/api/basin',
    stations: '/api/stations/actives',
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
  maps: {
    key: 'AIzaSyCnILw5Ddl2uXfyvFgEtPHTw-su8JlQzA8',
  },
  constants: {
    dimensions: {
      rainId: 3,
      levelId: 1,
    },
    sdo: {
      weatherUnderground: {
        id: 2,
        link: 'https://www.wunderground.com/dashboard/pws/$stationId',
        externalIdPlaceholder: '$stationId',
      },
      SNIH: {
        id: 6,
        link: 'https://snih.hidricosargentina.gob.ar/Filtros.aspx',
      },
      weatherLink: {
        id: 8,
        link: 'https://www.weatherlink.com/bulletin/$stationId',
        externalIdPlaceholder: '$stationId',
      },
      aesIbu: {
        id: 9,
        link: 'https://genexlinea.aesibu.com/datos/index_ar.html',
      },
    },
  },
  rastersURL: 'https://us-central1-hydro-dashboard-283320.cloudfunctions.net',
};

export default config;
