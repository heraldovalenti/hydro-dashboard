import axios from 'axios';

const URL = 'https://api.weather.com/v2/pws/dailysummary/1day';
const STATION_MAPPINGS = {
  IROSARIO12: 'Weather Underground - Campo Quijano',
  ISALTACE3: 'Weather Underground - La Isla',
  IMETND1: 'Weather Underground - Sala Guanaco',
  ISALTA10: 'Weather Underground - Cerro San Bernardo',
  ISALTA17: 'Weather Underground - San Lorenzo',
  IROSARIO32: 'Weather Underground - R. de la Frontera',
  ITUMBA11: 'Weather Underground - Santa Rosa de Chuschuyoc',
  IMONTE19: 'Weather Underground - Sargento Moya',
  IANDAL3: 'Weather Underground - Daza Chaquiago',
  ISALTA7: 'UCASAL - Colegio Belgrano',
  ILACAL8: 'UCASAL - La Caldera',
  ISALTA11: 'UCASAL - Fac. Ingeniería',
};
const baseParams = {
  apiKey: '6532d6454b8aa370768e63d6ba5a832e',
  format: 'json',
  units: 'e',
};
const latestData = async () => {
  const stationIds = Object.keys(STATION_MAPPINGS);
  const requests = stationIds.map((key) => retrieveStationData(key));
  const results = await Promise.all(requests);
  return results;
};

const retrieveStationData = async (stationId) => {
  const params = { ...baseParams, stationId };
  try {
    const response = await axios({
      method: 'get',
      url: URL,
      params: params,
    });
    const { data } = response;
    if (!data || !data.summaries || !data.summaries.length) {
      console.log(`No data available for ${stationId}`);
      return {};
    }
    const observation = data.summaries[0];
    const result = {
      id: STATION_MAPPINGS[stationId],
      dimension: 'Lluvia',
      value: observation.imperial.precipTotal,
      unit: 'in',
      date: observation.obsTimeUtc,
    };
    return result;
  } catch (e) {
    console.log(
      `Error while retrieving Wundermap data for ${stationId}: ${JSON.stringify(
        e
      )}`
    );
    return {};
  }
};

export const LatestData = {
  list: latestData,
};
