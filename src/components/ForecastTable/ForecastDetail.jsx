import React from 'react';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core';
import COLORS from '../../types/colors';

const useStyles = makeStyles({
  forecastDetail: {
    fontWeight: 400,
  },
  noData: {
    color: COLORS.RED.BASE,
  },
  rain_1: {
    backgroundColor: `${COLORS.BLUE.BASE}44`,
  },
  rain_2: {
    backgroundColor: `${COLORS.BLUE.BASE}88`,
  },
  rain_3: {
    backgroundColor: `${COLORS.BLUE.BASE}cc`,
  },
  rain_4: {
    backgroundColor: `${COLORS.BLUE.BASE}ff`,
  },
});

export const ForecastDetail = ({ detail }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const noData = detail == null;
  const content = noData
    ? t('forecast_page_detail_no_data')
    : detail.toFixed(2);
  let contentStyle = noData ? `${classes.noData}` : '';
  if (!noData) {
    if (content >= 1 && content < 2) contentStyle = `${classes.rain_1}`;
    if (content >= 2 && content < 4) contentStyle = `${classes.rain_2}`;
    if (content >= 4 && content < 7) contentStyle = `${classes.rain_3}`;
    if (content >= 7) contentStyle = `${classes.rain_4}`;
  }
  return (
    <TableCell
      className={`${classes.forecastDetail} ${contentStyle}`}
      align="right"
    >
      {content}
    </TableCell>
  );
};
