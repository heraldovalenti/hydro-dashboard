import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import COLORS from '../../../types/colors';

export const BlueSlider = withStyles({
  root: {
    color: COLORS.TURQUOISE.BASE,
    height: 8,
  },
})(Slider);
