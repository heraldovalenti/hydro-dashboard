import React from 'react';
import FulscreenModal from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<FulscreenModal/>', () => {
  it('default', () => {
    const Son = <div>Son</div>;

    const renderer = new ShallowRenderer();
    renderer.render(
      <FulscreenModal>
        <Son />
      </FulscreenModal>
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
