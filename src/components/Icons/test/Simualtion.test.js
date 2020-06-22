import React from 'react';
import SimulationIcon from '../Simulation';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<SimulationIcon/>', () => {
  it('default', () => {
    const props = {
      width: 300,
      height: 300,
    };
    const renderer = new ShallowRenderer();
    renderer.render(<SimulationIcon {...props} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
