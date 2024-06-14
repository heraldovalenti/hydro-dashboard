const fs = require('fs');

const fileNames = [
  'Alemania',
  'Maroma',
  'Medina',
  'Miraflores',
  'Perilago',
  'Punilla',
  'Viboras',
];
function parseStreamFile(streamName) {
  const alemaniaDat = fs.readFileSync(streamName + '.dat', 'utf8');
  const lines = alemaniaDat.split('\r\n');
  const streamPaths = [];
  let streamPath = [];
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length === 1) {
      console.log('processing line', parts);
      if (parts[0] === 'END' && streamPath.length > 0) {
        console.log('adding stream path and restaring it', streamPath.length);
        streamPaths.push(streamPath);
        streamPath = [];
        console.log('adding stream path and restaring it', streamPaths.length);
      }
    }
    // coordinate line
    else if (parts.length === 2) {
      const [lng, lat] = parts;
      const coordinate = {
        lat: Number.parseFloat(lat),
        lng: Number.parseFloat(lng),
      };
      streamPath.push(coordinate);
    }
  }
  return { streamName, streamPaths };
}

const result = fileNames.map((fileName) => parseStreamFile(fileName));

fs.writeFileSync('streamsv2.json', JSON.stringify(result), {
  encoding: 'utf8',
});
