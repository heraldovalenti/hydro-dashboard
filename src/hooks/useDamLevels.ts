import { useLatestObservations } from './useLatestObservations';

export const useDamLevels = () => {
  const { levelObservations } = useLatestObservations();
  const cc = levelObservations.find((o) => o.station.id === 104);
  const tunal = levelObservations.find((o) => o.station.id === 106);
  return {
    cc,
    tunal,
  };
};
