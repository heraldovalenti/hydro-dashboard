import React from 'react';
import EmptyState from '../';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<EmptyState/>', () => {
    it('default', () => {
        const props = {
            icon: 'icon',
            image: 'image',
            title: 'empty title',
            subtitle: 'empty subtitle',
            primaryActions: [{text: 'action 1'}],
            secondaryActions: [{text: 'action 2'}],
        }
        const renderer = new ShallowRenderer();
        renderer.render(<EmptyState {...props}/>);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });
});