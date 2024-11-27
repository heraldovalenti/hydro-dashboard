import React from 'react'
import './SlideDrawer.css'
import SlideDrawerButton from './SlideDrawerButton'

export default class SlideDrawer extends React.Component {
   render() {
      let drawerClasses = 'side-drawer'
      if (this.props.drawerOpen) {
         drawerClasses = 'side-drawer open'
      }
      return (
         <div>
            <SlideDrawerButton drawerOpen={this.props.drawerOpen} setDrawerOpen={this.props.setDrawerOpen}></SlideDrawerButton>
            <div className={drawerClasses}>
               {this.props.children}
            </div>
         </div>
      )
   }

}