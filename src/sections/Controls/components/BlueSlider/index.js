import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import COLORS from '../../../../types/colors';
import { Slider } from '@material-ui/core';

const BlueSlider = withStyles({
  root: {
    color: COLORS.TURQUOISE.BASE,
    height: 8,
  },
})(Slider);

export default BlueSlider;
