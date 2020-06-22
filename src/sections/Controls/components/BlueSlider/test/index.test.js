import React from 'react';
import BlueSlider from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<BlueSlider/>', () => {
  it('default', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<BlueSlider />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
