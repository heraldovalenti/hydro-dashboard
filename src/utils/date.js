import moment from 'moment';

const getISODateString = (date) => moment(date).format('YYYY-MM-DDTHH:mm:ss');
const getAmericanDateString = (date) =>
  moment(date).format('MMM DD YYYY HH:mm');
const getHoursApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'hours'));
const getDaysApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'days'));
const getWeeksApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'weeks'));
const now = () => moment();
const plusHours = (now, hours) => now + hours * 1000 * 60 * 60;
const plusDays = (now, days) => plusHours(now, days * 24);
const getAesTimeString = (date) => moment(date).format('DD/MM/YYYY HH:mm');
const getAesDateString = (date) => moment(date).format('DD/MM/YYYY');
const roundToMinutes = (date, toMinutes = 10) => {
  const input = moment(date);
  const inputZeroed = input.set('seconds', 0).set('milliseconds', 0);
  const inputMinutes = inputZeroed.get('minutes');
  if (toMinutes > 0) {
    const diff = toMinutes - (inputMinutes % toMinutes);
    return inputZeroed.add(diff, 'minutes');
  }
  const diff = inputMinutes % toMinutes;
  return inputZeroed.add(-diff, 'minutes');
};

const localToUTC = (date) => {
  const input = moment(date);
  const utcOffset = input.utcOffset();
  return input.add(utcOffset * -1, 'minutes');
};
const isValidDate = (date) => date && date.getTime && !isNaN(date.getTime());
const isBefore = (d1, d2) => moment(d1).isBefore(d2);
const isAfter = (d1, d2) => moment(d1).isAfter(d2);
const isSameDay = (d1, d2) => moment(d1).isSame(d2, 'day');
const startOfDay = (date) => moment(date).startOf('day');
export {
  getISODateString,
  getAmericanDateString,
  getHoursApart,
  getDaysApart,
  getWeeksApart,
  now,
  plusHours,
  plusDays,
  getAesTimeString,
  getAesDateString,
  localToUTC,
  isValidDate,
  isBefore,
  isAfter,
  isSameDay,
  startOfDay,
  roundToMinutes,
};
