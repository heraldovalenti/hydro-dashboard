import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { withStyles } from '@mui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
    paddingBottom: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
});
const ModalTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <FontAwesomeIcon icon="compress-alt" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const ModalContent = withStyles((theme) => ({
  root: {
    padding: 0,
    border: 'none',
  },
}))(DialogContent);

export default function FullscreenModal(props) {
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const toggleFullscreen = () => setShowFullscreenModal(!showFullscreenModal);

  useEffect(() => {
    Highcharts.charts.forEach((chart) => chart && chart.reflow());
  }, [showFullscreenModal]);

  const children = React.cloneElement(props.children, {
    toggleFullscreen: toggleFullscreen,
    isFullscreen: showFullscreenModal,
    isInModal: false,
  });

  const modalChildren = React.cloneElement(props.children, {
    toggleFullscreen: toggleFullscreen,
    isFullscreen: showFullscreenModal,
    isInModal: true,
  });

  return (
    <>
      {children}
      <Dialog
        className="fullscreen-modal"
        onClose={toggleFullscreen}
        aria-labelledby="fullscreen-modal__ttitle"
        open={showFullscreenModal}
        fullScreen={true}
      >
        <ModalTitle id="fullscreen-modal__title" onClose={toggleFullscreen}>
          {props.title}
        </ModalTitle>
        <ModalContent dividers>{modalChildren}</ModalContent>
      </Dialog>
    </>
  );
}
