import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { getAesTimeString } from '../../utils/date';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  tableHead: {
    fontWeight: 600,
  },
  tableRow: {
    fontWeight: 300,
  },
});

const ObservationTable = ({ observations, loading }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>
              {t('station_info_header_datetime')}
            </TableCell>
            <TableCell className={classes.tableHead} align="right">
              {t('station_info_header_value')}
            </TableCell>
            <TableCell className={classes.tableHead} align="right">
              {t('station_info_header_unit')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {observations.map((row) => (
            <TableRow key={row.time} className={classes.tableRow}>
              <TableCell
                className={classes.tableRow}
                component="th"
                scope="row"
              >
                {getAesTimeString(row.time)}
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                {row.value.toFixed(2)}
              </TableCell>
              <TableCell className={classes.tableRow} align="right">
                {row.unit.alias}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ObservationTable;
