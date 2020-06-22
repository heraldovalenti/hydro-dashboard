import React from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import addTreemapModule from 'highcharts/modules/treemap';
import { useTranslation } from 'react-i18next';
import PanelHeader from '../PanelHeader';
import COLORS, { trafficLightColors } from '../../types/colors';
import './styles.css';

const calculateColor = (value, limit, thresholds) =>
  value > limit ? COLORS.RED.BASE : calculateColorThreshold(value, thresholds);

const calculateColorThreshold = (value, thresholds) => {
  for (let i = 0; i < thresholds.length; i++) {
    if (value > thresholds[i].value) return trafficLightColors[i + 1];
  }
  return COLORS.DARK_GREEN.BASE;
};
const transformDataToTreeMap = (data, limit, thresholds) => {
  const treeMapData = transformDataToTreeMapByCounter(data);
  const treeMapTranformedData = _(treeMapData)
    .groupBy('parent')
    .map((group) => {
      return group.reduce(
        (result, item) => ({
          id: item.parent,
          name:
            treeMapData.find((toFind) => toFind.id === item.parent) &&
            treeMapData.find((toFind) => toFind.id === item.parent).name,
          value: result.value + item.value,
          color: calculateColor(result.value + item.value, limit, thresholds),
        }),
        { value: 0 }
      );
    })
    .value();

  return treeMapTranformedData;
};

const transformDataToTreeMapByCounter = (data) => {
  const treeMapData = [
    {
      id: 'main',
      name: 'Main Room',
    },
  ];
  const newData = _(data)
    .map((device) => ({
      id: device.counter.deviceId,
      name: device.counter.alias,
      parent: 'main',
      value:
        (_.sumBy(device.records, 'trafficIn') || 0) -
        (_.sumBy(device.records, 'trafficOut') || 0),
    }))
    .value();
  return [...treeMapData, ...newData];
};

export default function OcuppancyTreeMap({
  title,
  toggleFullscreen,
  isFullscreen,
  isInModal,
  isFullWidth = false,
  seriesData = [],
  categories,
  limit,
  thresholds,
}) {
  addTreemapModule(Highcharts);
  const defaults = {
    credits: false,
    title: {
      text: null,
    },
  };
  const { t } = useTranslation();

  const series = [
    ...seriesData.map((serieData, index) => ({
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      allowDrillToNode: true,
      animationLimit: 1000,
      dataLabels: {
        enabled: true,
      },
      levelIsConstant: false,
      levels: [
        {
          level: 1,
          dataLabels: {
            enabled: true,
          },
          borderWidth: 3,
        },
        {
          level: 2,
          dataLabels: {
            enabled: true,
          },
          borderWidth: 1,
        },
      ],
      data: transformDataToTreeMap(
        serieData,
        limit,
        [...thresholds].sort((x, y) => y.value - x.value)
      ),
    })),
  ];
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
        isFullWidth ? 'occupancy-body occupancy-body--full' : 'occupancy-body'
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
