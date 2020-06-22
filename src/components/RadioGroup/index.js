import React from "react";
import { RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import Radio from "../Radio";

export default props => (
  <>
    {props.legend && <FormLabel component="legend">{props.legend}</FormLabel>}
    <RadioGroup
      className={props.className}
      aria-label={props.name}
      name={props.name}
      value={props.value}
      onChange={event => props.onChange(event.target.value)}
    >
      {props.items.map(item => (
        <FormControlLabel
          key={item.value}
          value={item.value}
          control={<Radio />}
          label={item.label}
        />
      ))}
    </RadioGroup>
  </>
);
