import React from 'react';
import SlideDrawer from './SlideDrawer';

export default {
    title: 'SlideDrawer',
    component: SlideDrawer,
  };


export const closed = () => <SlideDrawer drawerOpen={false}></SlideDrawer>;
export const open = () => <SlideDrawer drawerOpen={true}></SlideDrawer>;
