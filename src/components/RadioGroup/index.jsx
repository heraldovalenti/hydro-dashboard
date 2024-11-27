import React from 'react';
import { RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Radio from '../Radio';

export default (props) => (
  <>
    {props.legend && <FormLabel component="legend">{props.legend}</FormLabel>}
    <RadioGroup
      className={props.className}
      aria-label={props.name}
      name={props.name}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      {props.items.map((item, index) => (
        <FormControlLabel
          key={`${item.value}_${index}`}
          value={item.value}
          control={<Radio />}
          label={item.label}
          disabled={props.disabled}
        />
      ))}
    </RadioGroup>
  </>
);
