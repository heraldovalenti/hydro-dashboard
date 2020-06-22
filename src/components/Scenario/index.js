import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import PanelHeader from '../PanelHeader';
import COLORS, { trafficLightColors } from '../../types/colors';
import './styles.css';

export default function Scenario({
  title,
  toggleFullscreen,
  isFullscreen,
  isInModal,
  isFullWidth = false,
  seriesData = [],
  seriesLegend,
  categories,
  limit,
  thresholds,
}) {
  const defaults = {
    credits: false,
    title: {
      text: null,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: { enabled: false },
    },
  };
  const { t } = useTranslation();
  const colors = Object.values(COLORS);

  function mapJsonToHighchartData(json) {
    var result = [];
    if (json) {
      Object.keys(json).forEach(function (key) {
        var rawRecordDate = json[key].recordDate;
        var date = Date.parse(rawRecordDate);
        result.push({ x: date, y: Math.round(json[key].scenario) });
      });
    }
    return result;
  }

  const series = [
    ...seriesData.map((serieData, index) => ({
      type: 'line',
      color: colors.map((color) => color.BASE)[index % (colors.length - 1)],
      marker: { enabled: false },
      data: categories ? serieData : mapJsonToHighchartData(serieData),
      name: seriesLegend && seriesLegend[index],
    })),
  ];

  if (limit) {
    defaults.yAxis.plotLines = [
      {
        dashStyle: 'dash',
        color: trafficLightColors[0],
        width: 4,
        value: limit, // Need to set this probably as a var.
      },
    ];
  }

  if (thresholds) {
    [...thresholds]
      .sort((x, y) => y.value - x.value)
      .forEach((threshold, index) =>
        defaults.yAxis.plotLines.push({
          dashStyle: 'dash',
          color: trafficLightColors[index + 1],
          width: 2,
          value: threshold.value, // Need to set this probably as a var.
        })
      );
  }
  const options = {
    ...defaults,
    series,
  };

  if (isFullscreen && isInModal) {
    options.chart = {
      height: '50%',
    };
  } else {
    options.chart = {
      height: '400px',
    };
  }
  const onFullscreen = isInModal ? null : toggleFullscreen;

  return (
    <div
      className={
        isFullWidth ? 'scenario-body scenario-body--full' : 'scenario-body'
      }
    >
      <PanelHeader
        title={t(title)}
        info={t(``)}
        onFullscreen={onFullscreen}
      ></PanelHeader>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
