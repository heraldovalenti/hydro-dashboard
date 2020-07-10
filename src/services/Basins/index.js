import { cabraCorral } from './cabra-corral-basin.dat';
import { tunal } from './tunal-basin.dat';

const BasinRepository = {
  cabraCorralBasin: async () => cabraCorral,
  tunalBasin: async () => tunal,
};
export { BasinRepository };
