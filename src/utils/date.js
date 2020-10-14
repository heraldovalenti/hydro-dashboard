import moment from 'moment';

const getISODateString = (date) => moment(date).format('YYYY-MM-DDTHH:mm:ss');
const getAmericanDateString = (date) =>
  moment(date).format('MMM DD YYYY HH:mm');
const getDaysApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'days'));
const getWeeksApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'weeks'));
const now = () => moment();
const plusHours = (now, hours) => now + hours * 1000 * 60 * 60;
const plusDays = (now, days) => plusHours(now, days * 24);
const getAesTimeString = (date) => moment(date).format('DD/MM/YYYY HH:mm');
const getAesDateString = (date) => moment(date).format('DD/MM/YYYY');
export {
  getISODateString,
  getAmericanDateString,
  getDaysApart,
  getWeeksApart,
  now,
  plusHours,
  plusDays,
  getAesTimeString,
  getAesDateString,
};
