import { fetchBasins as basinList } from '../backend';
import { basinAdapter } from './basinAdapter';

export const fetchBasins = async () => {
  const basins = await basinList();
  return basins.map(basinAdapter);
};
