import React, { useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import COLORS from '../../../types/colors';
import { Close } from '@mui/icons-material';
import classNames from 'classnames';

import { IconButton, Input, Slider, Grid, Tooltip } from '@mui/material';

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
  value,
  setValue,
  setLabelChange,
  onDelete,
  index,
  className,
  max,
}) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  const handleLabelChange = (event) => {
    setLabelChange(id, event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(id, newValue);
  };

  const handleValueChange = (event) => {
    setValue(id, event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleValueBlur = (event) => {
    if (value < 0) {
      setValue(id, 0);
    }
    if (value > max) {
      setValue(id, 0);
    }
  };

  const header = (index) => {
    return (
      <Grid container spacing={1} alignItems="center">
        {index !== 0 && <Grid item xs={2}></Grid>}
        {index === 0 && (
          <Grid item xs={4}>
            <span className={classes.label}>Name</span>
          </Grid>
        )}
        <Grid item xs={4}>
          <span className={classes.label}>Value</span>
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
        <Grid item xs={setLabelChange ? 4 : 2}>
          {setLabelChange ? (
            <Input
              className={classes.input}
              value={label}
              margin="dense"
              onChange={handleLabelChange}
              inputProps={{
                type: 'text',
                'aria-labelledby': 'input-slider',
              }}
            />
          ) : (
            <span className={classes.label}>{label}</span>
          )}
        </Grid>
        <Grid item xs={4}>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleValueChange}
            onBlur={handleValueBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs={onDelete ? 4 : 5}>
          <BlueSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            max={max}
            className={classes.slider}
          />
        </Grid>
      </Grid>
    </div>
  );
}
