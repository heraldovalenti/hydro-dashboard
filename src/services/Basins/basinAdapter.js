export const basinAdapter = (basin) => {
  const { id, description, color, path } = basin;
  const result = path.split('\n').map((line) => {
    const [lng, lat] = line.split('\t');
    return { lng: lng.trim(), lat: lat.trim() };
  });
  return { id, description, color, path: result };
};
