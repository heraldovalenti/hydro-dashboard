import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAesTimeString } from '../../utils/date';

export const ObservationsChart = ({ loading, observations }) => {
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: '',
          xAxis: {
            categories: observations.map((o) =>
              getAesTimeString(new Date(o.time))
            ),
          },
          series: [
            {
              name: observations[0]?.dimension.description,
              data: observations.map((o) => {
                // console.log(
                //   o.value,
                //   o.value.toFixed(2),
                //   Number.parseFloat(o.value)
                // );
                return Number.parseFloat(o.value.toFixed(2));
              }),
            },
          ],
        }}
      />
    </div>
  );
};
