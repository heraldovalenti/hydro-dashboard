import { Slider } from '@mui/material';
import { withStyles } from '@mui/styles';
import COLORS from '../../../types/colors';

export const BlueSlider = withStyles({
  root: {
    color: COLORS.TURQUOISE.BASE,
    height: 8,
  },
})(Slider);
