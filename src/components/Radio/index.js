import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const StyledRadio = withStyles({
  root: {
    color: grey[400],
    "&$checked": {
      color: grey[800]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

export default StyledRadio;
