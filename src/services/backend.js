import axios from 'axios';
import { isHQModelStationDataOrigin } from '../components/StationInfo/stationUtil';
import config from '../config';
import { getISODateString, localToUTC } from '../utils/date';

export const fetchBasins = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.basins}`,
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.warn(`Error fetching basins: ${e}`);
    return [];
  }
};

export const fetchStations = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.stations}`,
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.warn(`Error fetching stations: ${e}`);
    return [];
  }
};

export const fetchRainData = async (stationId, dateFrom, dateTo) => {
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    // console.log(`fetching rain data for period ${JSON.stringify(period)}`);
    const observationsResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.observations}/${stationId}/${config.constants.rainId}`,
      data: period,
    });
    // console.log(`rain data 2 ${observationsResponse}`);
    const accumulationResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.rainAccumulation}/${stationId}`,
      data: period,
    });
    // console.log(`rain data 3 ${accumulationResponse}`);
    return {
      observations: observationsResponse.data,
      accumulation: accumulationResponse.data,
    };
  } catch (e) {
    console.warn(`Error fetching station rain data: ${e}`);
    return {};
  }
};

export const fetchAccumulationData = async (dateFrom, dateTo) => {
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    console.log(
      `fetching accumulation data for period ${JSON.stringify(period)}`
    );
    const accumulationDataResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.rainAccumulation}`,
      data: period,
    });
    return accumulationDataResponse.data;
  } catch (e) {
    console.warn(`Error fetching accumulation data: ${e}`);
    return [];
  }
};

export const fetchLevelData = async (stationId, dateFrom, dateTo) => {
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    console.log(`fetching level data for period ${JSON.stringify(period)}`);
    const observationsResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.observations}/${stationId}/${config.constants.levelId}`,
      data: period,
    });
    return {
      observations: observationsResponse.data,
    };
  } catch (e) {
    console.warn(`Error fetching station level data: ${e}`);
    return {};
  }
};

export const fetchObservations = async (
  stationId,
  dateFrom,
  dateTo,
  page = 1
) => {
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    console.log(`fetching observations for period ${JSON.stringify(period)}`);
    const observationsResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${
        config.api.observations
      }/${stationId}?size=20&page=${page - 1}`,
      data: period,
    });
    return observationsResponse.data;
  } catch (e) {
    console.warn(`Error fetching observations: ${e}`);
    return [];
  }
};

export const fetchSDOObservations = async (
  stationId,
  sdo,
  dateFrom,
  dateTo,
  page = 1,
  size = 20
) => {
  const { id: dimensionId } = sdo.dimension;
  const useHQModel = isHQModelStationDataOrigin(sdo);
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    console.log(`fetching observations for period ${JSON.stringify(period)}`);
    const observationsResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.observations}/${stationId}/${dimensionId}`,
      data: period,
      params: {
        size,
        page: page - 1,
        useHQModel,
      },
    });
    return observationsResponse.data;
  } catch (e) {
    console.warn(`Error fetching observations: ${e}`);
    return [];
  }
};

export const fetchLatestbservations = async (dimensionId, dateFrom, dateTo) => {
  try {
    const period = toUTCInterval({ dateFrom, dateTo });
    const { from, to } = period;
    console.log(
      `fetching latest observations for period ${JSON.stringify(period)}`
    );
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.latestObservations}/${dimensionId}`,
      params: {
        from,
        to,
      },
    });
    return response.data;
  } catch (e) {
    console.warn(`Error fetching latest observations: ${e}`);
    return [];
  }
};

export const exportObservations = async (
  stationId,
  dimensionId,
  dateFrom,
  dateTo
) => {
  const period = toUTCInterval({ dateFrom, dateTo });
  const url = `${config.baseURL}${config.api.exportObservations}/${stationId}/${dimensionId}?from=${period.from}&to=${period.to}`;
  window.open(url);
};

export const fetchForecast = async (refresh = false) => {
  try {
    console.log(`fetching forecast (snapshot? ${!refresh})`);
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${
        refresh ? config.api.forecastRefresh : config.api.forecast
      }`,
    });
    return response.data;
  } catch (e) {
    console.warn(`Error fetching forecast (refreshing: ${refresh}): ${e}`);
    return {};
  }
};

const toUTCInterval = ({ dateFrom, dateTo }) => {
  return {
    from: getISODateString(localToUTC(dateFrom)),
    to: getISODateString(localToUTC(dateTo)),
  };
};
