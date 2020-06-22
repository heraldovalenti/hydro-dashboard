import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import COLORS from '../../../types/colors';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';

import {
  IconButton,
  Input,
  InputAdornment,
  Slider,
  Grid,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
  label: {
    color: 'rgb(70, 70, 70)',
    'font-size': '12px',
  },
  input: {
    width: '100%',
    color: 'rgb(70, 70, 70)',
    'font-size': '12px',
  },
  delete: {
    position: 'absolute',
    right: '-4px',
  },
  slider: {
    top: '5px',
  },
});

const BlueSlider = withStyles({
  root: {
    color: COLORS.TURQUOISE.BASE,
    height: 8,
  },
})(Slider);

export default function InputSlider({
  id,
  percentChange,
  setPercentChange,
  label,
  normal,
  setNormal,
  setLabelChange,
  onDelete,
  index,
  className,
}) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleLabelChange = (event) => {
    setLabelChange(id, event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setPercentChange(id, newValue);
  };

  const handleInputChange = (event) => {
    setPercentChange(
      id,
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleNormalChange = (event) => {
    setNormal(id, event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleNormalBlur = (event) => {
    if (normal < 0) {
      setNormal(id, 0);
    } else if (normal > 100) {
      setNormal(id, 100);
    }
  };

  const handleBlur = () => {
    if (percentChange < 0) {
      setPercentChange(id, 0);
    } else if (percentChange > 150) {
      setPercentChange(id, 150);
    }
  };

  const header = (index) => {
    return (
      <Grid container spacing={1} alignItems="center">
        {index !== 0 && <Grid item xs={2}></Grid>}
        {index === 0 && (
          <Grid item xs={3}>
            <span className={classes.label}>Segment</span>
          </Grid>
        )}
        <Grid item xs={3}>
          <span className={classes.label}>Normal</span>
        </Grid>
        <Grid item xs={3}>
          <span className={classes.label}>Impact</span>
        </Grid>
      </Grid>
    );
  };

  return (
    <div
      className={classNames({ [classes.root]: true, [className]: true })}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      {id === 1 || index === 0 ? header(index) : null}
      <Grid container spacing={2} alignItems="center">
        {hover && onDelete && (
          <Grid item xs={2} className={classes.delete}>
            <Tooltip title="Delete">
              <IconButton onClick={onDelete} aria-label="delete" size="small">
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        <Grid item xs={setLabelChange ? 3 : 2}>
          {setLabelChange ? (
            <Input
              className={classes.input}
              value={label}
              margin="dense"
              onChange={handleLabelChange}
              onBlur={handleBlur}
              inputProps={{
                type: 'text',
                'aria-labelledby': 'input-slider',
              }}
            />
          ) : (
            <span className={classes.label}>{label}</span>
          )}
        </Grid>
        <Grid item xs={3}>
          <Input
            className={classes.input}
            value={normal}
            margin="dense"
            onChange={handleNormalChange}
            onBlur={handleNormalBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            className={classes.input}
            value={percentChange}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 150,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={onDelete ? 3 : 4}>
          <BlueSlider
            value={typeof percentChange === 'number' ? percentChange : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={150}
            valueLabelDisplay="auto"
            className={classes.slider}
          />
        </Grid>
      </Grid>
    </div>
  );
}
