import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getAesDateString } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import { forecastAdapter, groupByCities } from './utils';
import { ForecastDetail } from './ForecastDetail';

const useStyles = makeStyles({
  tableMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHead: {
    fontWeight: 600,
  },
  tableRow: {
    fontWeight: 300,
  },
});

const ForecastTable = ({ forecast: forecastInfo }) => {
  const groupedByCity = groupByCities(forecastInfo);
  return groupedByCity.map((cityForecast) => {
    const { city, forecast } = cityForecast;
    return <CityForecastTable key={city} city={city} forecastInfo={forecast} />;
  });
};

const CityForecastTable = ({ city, forecastInfo }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { days, forecasts } = forecastAdapter(forecastInfo);
  return (
    <TableContainer className={classes.tableMargin} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead} align="left" colSpan={20}>
              {t(`city_${city}`)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHead} align="left">
              {t('forecast_page_provider')}
            </TableCell>
            {days.map((d) => {
              const dateString = getAesDateString(d);
              return (
                <TableCell
                  key={dateString}
                  className={classes.tableHead}
                  align="right"
                >
                  {dateString}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(forecasts).map((provider) => {
            return (
              <TableRow key={provider} className={classes.tableRow}>
                <TableCell
                  className={classes.tableRow}
                  component="th"
                  scope="row"
                  align="left"
                >
                  {provider}
                </TableCell>
                {forecasts[provider].map((detail, index) => (
                  <ForecastDetail
                    key={`${provider}.${index}`}
                    detail={detail}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForecastTable;
