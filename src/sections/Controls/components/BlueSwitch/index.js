import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import COLORS from '../../../../types/colors';
import { Switch } from '@material-ui/core';

const BlueSwitch = withStyles({
  switchBase: {
    color: '#fafafa',
    '&$checked': {
      color: COLORS.TURQUOISE.BASE,
    },
    '&$checked + $track': {
      backgroundColor: COLORS.TURQUOISE.BASE,
    },
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
  checked: {},
  track: {},
})(Switch);

export default BlueSwitch;
