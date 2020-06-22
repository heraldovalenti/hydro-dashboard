import React from 'react';
import Radio from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<Radio/>', () => {
    it('renders no items', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Radio items={[]}/>);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });

    it('renders several items', () => {
        const items = [{value: 1, label: 'one'}, {value: 2, label: 'two'}];
        const renderer = new ShallowRenderer();
        renderer.render(<Radio items={items}/>);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });
});