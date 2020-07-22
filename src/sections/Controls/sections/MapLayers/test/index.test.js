import React from 'react';
import Threshold from '..';
import renderer from 'react-test-renderer';
import StoreProvider from '../../../../../store';

describe('<Threshold/>', () => {
  it('default', () => {
    const tree = renderer
      .create(
        <StoreProvider>
          <Threshold />
        </StoreProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
