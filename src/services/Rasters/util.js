export const parseName = (fileName) => {
  const prefixRemoved = fileName.split('prcpWRF_dia+')[1];
  const [sufixRemoved] = prefixRemoved.split('.tif');
  const [day, periodAndCycle] = sufixRemoved.split('_de_');
  const [begin, endAndCycle] = periodAndCycle.split('_a_');
  const [end, cycle] = endAndCycle.split('_ciclo-');
  return { day, begin, end, cycle };
};
