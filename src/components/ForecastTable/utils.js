import { isBefore, isSameDay, startOfDay } from '../../utils/date';

export const forecastAdapter = (forecastInfo) => {
  const days = forecastInfo.forecasts
    .map((f) => f.details)
    .flat()
    .map((detail) => detail.time)
    .reduce((result, curr) => {
      return !result.find((date) => isSameDay(date, curr))
        ? [...result, startOfDay(curr)]
        : [...result];
    }, [])
    .sort((d1, d2) => (isBefore(d1, d2) ? -1 : 1));
  const providers = forecastInfo.forecasts.map((f) => f.provider);
  const forecasts = {};
  for (let p of providers) {
    forecasts[p] = [];
    const details = forecastInfo.forecasts.find((f) => f.provider === p)
      .details;
    for (let day of days) {
      const dayTotal = details
        .filter((d) => isSameDay(day, d.time))
        .reduce(
          (total, d) => (d.value !== null ? total + d.value : total),
          null
        );
      forecasts[p].push(dayTotal);
    }
  }
  return { days, forecasts };
};
