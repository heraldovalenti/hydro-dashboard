const NAME_ID_MAPPING = {
  ['AES - CC']: { id: 'CabraCorral', dimensions: ['Nivel', 'Caudal'] },
  ['AES - PB']: { id: `PenasBlancas`, dimensions: ['Nivel'] },
  ['AES - Miraflores']: {
    id: 'Miraflores',
    dimensions: ['Nivel', 'Lluvia', 'Bateria'],
  },
  ['AES - ET']: { id: 'Tunal', dimensions: ['Nivel', 'Caudal'] },
  ['AES - Campo Quijano']: {
    id: 'CampoQuijano',
    dimensions: ['Lluvia', 'Bateria'],
  },
};
export const latestDataForName = (name, latestData) => {
  const mapping = NAME_ID_MAPPING[name];
  if (!mapping) return [];
  const dataForName = latestData.filter(
    (dataEntry) => dataEntry.id === mapping.id
  );
  return latestEntries(dataForName, mapping.dimensions);
};

const latestEntries = (data, dimensions) => {
  return dimensions.map((dimension) => {
    const dimensionEntries = data.filter(
      (entry) => entry.dimension === dimension
    );
    dimensionEntries.sort(
      (a, b) => new Date(Date.parse(b.date)) - new Date(Date.parse(a.date))
    );
    return dimensionEntries[0];
  });
};
