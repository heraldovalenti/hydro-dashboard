import axios from 'axios';
import config from '../config';
import { now, plusHours, getISODateString, localToUTC } from '../utils/date';

export const fetchStations = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.baseURL}${config.api.stations}`,
    });
    const { data } = response;
    return data;
  } catch (e) {
    console.log(`Error fetching stations: ${e}`);
    return [];
  }
};

export const fetchRainData = async (stationId, hours) => {
  try {
    const period = periodForHours(hours);
    console.log(`fetching rain data for period ${JSON.stringify(period)}`);
    const observationsResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.observations}/${stationId}/${config.constants.rainId}`,
      data: period,
    });
    console.log(`rain data 2 ${observationsResponse}`);
    const accumulationResponse = await axios({
      method: 'post',
      url: `${config.baseURL}${config.api.rainAccumulation}/${stationId}`,
      data: period,
    });
    console.log(`rain data 3 ${accumulationResponse}`);
    return {
      observations: observationsResponse.data,
      accumulation: accumulationResponse.data,
    };
  } catch (e) {
    console.log(`Error fetching station rain data: ${e}`);
    return {};
  }
};

export const fetchLevelData = async (stationId, hours) => {
  try {
    const period = periodForHours(hours);
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
    console.log(`Error fetching station level data: ${e}`);
    return {};
  }
};

export const periodForHours = (hours) => {
  const nowDate = now();
  const fromDate = plusHours(nowDate, -hours);
  return {
    from: getISODateString(localToUTC(fromDate)),
    to: getISODateString(localToUTC(nowDate)),
  };
};
