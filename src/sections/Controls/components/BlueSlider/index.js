import React from 'react';
import { withStyles } from '@mui/styles';
import COLORS from '../../../../types/colors';
import { Slider } from '@mui/material';

const BlueSlider = withStyles({
  root: {
    color: COLORS.TURQUOISE.BASE,
    height: 8,
  },
})(Slider);

export default BlueSlider;
