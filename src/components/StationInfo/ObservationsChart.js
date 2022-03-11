import React, { useState, useEffect } from 'react';
import { fetchSDOObservations } from '../../services/backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAesTimeString } from '../../utils/date';

export const ObservationsChart = ({ stationId, sdo, dateFrom, dateTo }) => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadObservations = async () => {
      if (!loading) {
        setLoading(true);
        const { content } = await fetchSDOObservations(
          stationId,
          sdo,
          dateFrom,
          dateTo,
          1,
          1000
        );
        content.sort((o1, o2) => new Date(o1.time) - new Date(o2.time));
        setObservations(content);
        setLoading(false);
      }
    };
    loadObservations();
  }, []);
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
                console.log(
                  o.value,
                  o.value.toFixed(2),
                  Number.parseFloat(o.value)
                );
                return Number.parseFloat(o.value.toFixed(2));
              }),
            },
          ],
        }}
      />
    </div>
  );
};
