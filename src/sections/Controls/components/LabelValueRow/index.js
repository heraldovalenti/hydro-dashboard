import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';

export default function LabelValueRow({
  label,
  type,
  value,
  setValue,
  adornmentType,
}) {
  function handleValueChange(event) {
    const value = type === 'number' ? +event.target.value : event.target.value;
    setValue(value);
  }

  return (
    <div className="row row--label-value">
      <div className="label">{label}</div>
      <Input
        className="input-field"
        onChange={handleValueChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 0,
          type,
        }}
        value={value}
        startAdornment={
          adornmentType === 'money' && (
            <InputAdornment position="start">$</InputAdornment>
          )
        }
        endAdornment={
          adornmentType === 'percent' && (
            <InputAdornment position="end">%</InputAdornment>
          )
        }
      />
    </div>
  );
}
