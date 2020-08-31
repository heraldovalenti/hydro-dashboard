import axios from 'axios';

const URL =
  'https://us-central1-hydro-dashboard-283320.cloudfunctions.net/latestData';
// 'http://localhost:8080';

const latestData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: URL,
    });
    console.log(`response.data.length=${response.data.length}`);
    // console.log(`response=${JSON.stringify(response)}`);
    const datas = response.data.map((fileEntry) => fileEntry.data);
    const result = datas.flat();
    return result;
  } catch (e) {
    console.log(`Error while retrieving latest data: ${JSON.stringify(e)}`);
    return [];
  }
};

export const LatestData = {
  list: latestData,
};
