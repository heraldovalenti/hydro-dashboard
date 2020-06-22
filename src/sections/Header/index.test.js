import React from 'react';
import Header from './';
import renderer from 'react-test-renderer';
import StoreProvider from '../../store';

describe('<Header/>', () => {
  it('renders header with loading dates when dates were not yet passed', () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <Header />
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders header with dates when dates loaded', () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <Header startDate={'2020-03-03'} endDate={'2020-04-04'}></Header>
        </StoreProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
