import React from 'react';
import CollapsiblePanel from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<CollapsiblePanel/>', () => {
  it('renders default', () => {
    const testProps = { expanded: false, title: 'Hi Im an expanded title' };
    const renderer = new ShallowRenderer();
    renderer.render(
      <CollapsiblePanel {...testProps}>
        <div>Im the content</div>
      </CollapsiblePanel>
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
