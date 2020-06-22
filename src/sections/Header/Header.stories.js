import React from 'react';
import Header from '.';

export default {
  title: 'Header',
  component: Header,
};

export const WithDates = () => (
  <Header startDate={'2020-03-03'} endDate={'2020-04-04'}></Header>
);

export const Loading = () => <Header />;
