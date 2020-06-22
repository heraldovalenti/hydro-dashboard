import React from 'react';
import BlueSwitch from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<BlueSwitch/>', () => {
  it('default', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<BlueSwitch />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
