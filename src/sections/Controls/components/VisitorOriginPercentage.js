import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
    input: {
        width: 65,
        color: 'rgb(70, 70, 70)',
        'font-size': '12px',
    },
});

export default function VisitorOriginPercentage({ normal, setNormal }) {
    const classes = useStyles();

    const handleNormalChange = (event) => {
        setNormal(event.target.value === '' ? '' : Number(event.target.value));
    };
    return (
        <Input
            className={classes.input}
            value={normal}
            margin="dense"
            onChange={handleNormalChange}
            inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
        />
    );
}