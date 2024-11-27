import React from 'react';
import { withStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

const StyledRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[800],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default StyledRadio;
