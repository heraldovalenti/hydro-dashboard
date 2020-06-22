import moment from 'moment';

const getISODateString = (date) => moment(date).format('YYYY-MM-DDTHH:mm:ss');
const getAmericanDateString = (date) =>
  moment(date).format('MMM DD YYYY HH:mm');
const getDaysApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'days'));
const getWeeksApart = (startDate, endDate) =>
  Math.abs(moment(startDate).diff(moment(endDate), 'weeks'));

export { getISODateString, getAmericanDateString, getDaysApart, getWeeksApart };
