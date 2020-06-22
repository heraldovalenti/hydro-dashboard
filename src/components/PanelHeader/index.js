import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
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
