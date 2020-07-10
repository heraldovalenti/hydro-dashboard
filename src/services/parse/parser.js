import { readFile, appendFile } from 'fs';

const loadDataFile = async (file) => {
  console.log(`reading ${file}...`);
  const riverbeds = await new Promise((resolve, reject) => {
    readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return riverbeds;
};

const readData = async (file) => {
  console.log(`parsing ${file}...`);
  const data = await loadDataFile(`${__dirname}/${file}`);
  const lines = data.split('\r\n');
  const result = [];
  let streamsCoords = [];
  for (let i = 0; i < lines.length; i++) {
    const element = lines[i];
    const trimmed = element.trim();
    const coords = trimmed.split('\t');
    if (coords.length === 2) {
      streamsCoords.push(coords);
    } else if (trimmed === 'END' && streamsCoords.length > 0) {
      result.push(streamsCoords);
      streamsCoords = [];
    }
  }
  return result;
};

const parseData = (data) => {
  return data.map((dataSet) => {
    return dataSet.map((coordinate) => {
      return {
        lat: parseFloat(coordinate[1]),
        lng: parseFloat(coordinate[0]),
      };
    });
  });
};

const dumpData = async (fileName) => {
  const data = await readData(fileName);
  const streams = await parseData(data);
  const dumpFile = `${__dirname}/${fileName}.js`;
  const streamsJson = JSON.stringify(streams);
  const options = { flag: 'w' };
  await new Promise((resolve, reject) => {
    appendFile(dumpFile, streamsJson, options, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${fileName} dump completed: ${err}`);
        resolve();
      }
    });
  });
};

export { readData, parseData, dumpData };
