import { cabraCorral } from './cabra-corral-basin.dat';
import { tunal } from './tunal-basin.dat';

const BasinRepository = {
  cabraCorralBasin: async () => cabraCorral,
  tunalBasin: async () => tunal,
};
export { BasinRepository };

export const fetchBasins = async () => {
  const basin1 = await BasinRepository.cabraCorralBasin();
  const basin2 = await BasinRepository.tunalBasin();
  return [
    { id: 'cabraCorral', data: basin1 },
    { id: 'tunal', data: basin2 },
  ];
};
