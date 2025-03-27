import { API_URL, MAPS_KEY, RASTERS_URL } from './envs';

const config = {
  serviceInterceptors: false,
  baseURL: API_URL,
  api: {
    basins: '/api/basin',
    stations: '/api/stations',
    observations: '/api/observations',
    latestObservations: '/api/observations/latestObservations',
    rainAccumulation: '/api/rain-accumulation/v2',
    streamLevel: '/api/stream-level',
    exportObservations: '/api/export/observations',
    forecast: '/api/forecast',
    forecastRefresh: '/api/forecast/refresh',
    aes: '/api/aes',
    healthCheck: '/api/health-check',
    rasters: '/rasters',
  },
  rastersURL: RASTERS_URL,
  maps: {
    key: MAPS_KEY,
  },
  constants: {
    dimensions: {
      levelId: 1,
      flowId: 2,
      rainId: 3,
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
      weatherCloud: {
        id: 10,
        link: 'https://app.weathercloud.net/d$stationId#evolution',
        externalIdPlaceholder: '$stationId',
      },
      pwsWeather: {
        id: 11,
        link: 'https://www.pwsweather.com/station/$stationId',
        externalIdPlaceholder: '$stationId',
      },
      rp5: {
        id: 12,
        link: 'https://rp5.ru/$stationId',
        externalIdPlaceholder: '$stationId',
      },
      aesGSheet: {
        id: 13,
        link:
          'https://docs.google.com/spreadsheets/d/1Hm-HsZ7Sx3a2i-QSbKF45yCzvKsNhhIJXOJmFQ9L3Ts/edit?gid=156159900#gid=156159900',
      },
    },
  },
};

export default config;
