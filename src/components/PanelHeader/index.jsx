import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import React from 'react';
import COLORS from '../../types/colors';
import './styles.css';

const useStylesTooltip = makeStyles(() => ({
  tooltip: {
    font: '300 10.5pt',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
  },
}));

export default function PanelHeader({
  title,
  info,
  downloadHandler,
  onFullscreen,
  children,
}) {
  const tooltipClasses = useStylesTooltip();
  const iconColor = COLORS.ORANGE.BRAND;

  return (
    <div className="panel__header">
      {children}
      <div className="title">{title}</div>
      <ButtonGroup className="buttons" size="large" variant="text">
        {downloadHandler && (
          <Button aria-label="Download" onClick={downloadHandler}>
            <FontAwesomeIcon color={iconColor} icon="download" />
          </Button>
        )}
        {info && (
          <Tooltip
            classes={tooltipClasses}
            TransitionComponent={Zoom}
            disableFocusListener
            title={info}
          >
            <Button aria-label="Info">
              <FontAwesomeIcon color={iconColor} icon="info-circle" />
            </Button>
          </Tooltip>
        )}
        {onFullscreen && (
          <Button aria-label="Fullscreen" onClick={onFullscreen}>
            <FontAwesomeIcon color={iconColor} icon="expand-alt" />
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
