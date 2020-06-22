import React from 'react';

import Scenario from '.';

export default {
  component: Scenario,
  title: 'Scenario',
};

const visitationData = [
  { recordDate: '2020-01-01', count: 1124 },
  { recordDate: '2020-01-02', count: 1224 },
  { recordDate: '2020-01-03', count: 1204 },
];
const forecastData = [
  { recordDate: '2020-01-01', count: 1234 },
  { recordDate: '2020-01-02', count: 1324 },
  { recordDate: '2020-01-03', count: 1254 },
  { recordDate: '2020-01-04', count: 1295 },
  { recordDate: '2020-01-05', count: 1301 },
  { recordDate: '2020-01-06', count: 1250 },
];
export const DataNotFetched = () => (
  <Scenario visitationData={visitationData} forecastData={forecastData} />
);
export const DataFetched = () => (
  <Scenario visitationData={visitationData} forecastData={forecastData} />
);
export const NoData = () => <Scenario visitationData={[]} forecastData={[]} />;
