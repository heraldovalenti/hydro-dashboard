import React from 'react';
import './SlideDrawerButton.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default class SlideDrawerButton extends React.Component {
  drawerToggleClickHandler = () => {
    this.props.setDrawerOpen(!this.props.drawerOpen);
  };

  render() {
    let icon;
    let buttonClassName;
    if (this.props.drawerOpen) {
      icon = <ArrowForwardIosIcon />;
      buttonClassName = 'drawer-button drawer-button-open';
    } else {
      buttonClassName = 'drawer-button';
      icon = <ArrowBackIosIcon />;
    }
    return (
      <button
        onClick={this.drawerToggleClickHandler}
        className={buttonClassName}
      >
        {icon}
      </button>
    );
  }
}
