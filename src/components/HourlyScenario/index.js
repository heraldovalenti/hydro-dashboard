import React from 'react';
import Scenario from '../Scenario';
import moment from 'moment';

const calculateCapacity = (traffic) => {
  return traffic.map((item, index) => {
    const prevCapacity = index && traffic[index - 1].capacity;
    item.capacity = prevCapacity + item.trafficIn - item.trafficOut;
    item.recordDate = moment(item.recordDate).format('HH:mm');
    return item;
  });
};

export default function HourlyScenario(props) {
  const series = props.seriesData.map((data) =>
    calculateCapacity(JSON.parse(JSON.stringify(data)))
  );

  const categories = series[0].map((serie) => serie.recordDate);
  return (
    <Scenario
      {...props}
      seriesData={series.map((serie) =>
        serie.map((serieItem) => serieItem.capacity)
      )}
      categories={categories}
    />
  );
}
