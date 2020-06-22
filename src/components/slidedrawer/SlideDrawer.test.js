import React from 'react';
import { mount } from 'enzyme';
import SlideDrawer from './SlideDrawer';

describe('<SlideDrawer/>', () => {
    it('renders opened slide drawer when drawerOpen param is true', () => {
        const wrapper = mount(<SlideDrawer drawerOpen={true}></SlideDrawer>);
        expect(wrapper.find('button').hasClass('drawer-button-open')).toBeTruthy();
        expect(wrapper.find('.side-drawer').hasClass('open')).toBeTruthy();
    });

    it('renders closed slide drawer when drawerOpen param is false', () => {
        const wrapper = mount(<SlideDrawer drawerOpen={false}></SlideDrawer>);
        expect(wrapper.find('button').hasClass('drawer-button')).toBeTruthy();
        expect(wrapper.find('.side-drawer').hasClass('open')).toBeFalsy();
    });
});
