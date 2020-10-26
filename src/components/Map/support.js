const NAME_ID_MAPPING = {
  'AES - CC': { id: 'CabraCorral', dimensions: ['Nivel', 'Caudal'] },
  'AES - PB': { id: `PenasBlancas`, dimensions: ['Nivel'] },
  'AES - Miraflores': {
    id: 'Miraflores',
    dimensions: ['Nivel', 'Lluvia', 'Bateria'],
  },
  'AES - ET': { id: 'Tunal', dimensions: ['Nivel', 'Caudal'] },
  'AES - Campo Quijano': {
    id: 'CampoQuijano',
    dimensions: ['Lluvia', 'Bateria'],
  },
  'AES - Punilla': {
    id: 'Punilla',
    dimensions: ['Nivel', 'Bateria'],
  },
  'AES - La Punilla': {
    id: 'Punilla',
    dimensions: ['Lluvia'],
  },
  'AES - Cachi': {
    id: 'Cachi',
    dimensions: ['Nivel', 'Lluvia', 'Bateria'],
  },
  'AES - Medina': {
    id: 'Medina',
    dimensions: ['Nivel', 'Lluvia', 'Bateria'],
  },
  'Weather Underground - Campo Quijano': {
    id: 'Weather Underground - Campo Quijano',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - La Isla': {
    id: 'Weather Underground - La Isla',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - Sala Guanaco': {
    id: 'Weather Underground - Sala Guanaco',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - Cerro San Bernardo': {
    id: 'Weather Underground - Cerro San Bernardo',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - San Lorenzo': {
    id: 'Weather Underground - San Lorenzo',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - R. de la Frontera': {
    id: 'Weather Underground - R. de la Frontera',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - Santa Rosa de Chuschuyoc': {
    id: 'Weather Underground - Santa Rosa de Chuschuyoc',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - Sargento Moya': {
    id: 'Weather Underground - Sargento Moya',
    dimensions: ['Lluvia'],
  },
  'Weather Underground - Daza Chaquiago': {
    id: 'Weather Underground - Daza Chaquiago',
    dimensions: ['Lluvia'],
  },
  'UCASAL - Colegio Belgrano': {
    id: 'UCASAL - Colegio Belgrano',
    dimensions: ['Lluvia'],
  },
  'UCASAL - Fac. Ingeniería': {
    id: 'UCASAL - Fac. Ingeniería',
    dimensions: ['Lluvia'],
  },
  'UCASAL - La Caldera': {
    id: 'UCASAL - La Caldera',
    dimensions: ['Lluvia'],
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
