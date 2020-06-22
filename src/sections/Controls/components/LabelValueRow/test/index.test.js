import React from 'react';
import LabelValueRow from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<LabelValueRow/>', () => {
  it('renders default', () => {
    const testProps = {
      label: '',
      value: '',
      setValue: () => {},
    };

    const renderer = new ShallowRenderer();
    renderer.render(<LabelValueRow {...testProps} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
