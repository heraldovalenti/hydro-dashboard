import React from 'react';
import Scenario from './index';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('<Scenario/>', () => {
  Date.now = jest.fn(() => new Date('2020-05-13T12:00:00.000Z'));

  it('renders no data', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Scenario
        title={'scenario_panel_title'}
        tooltip={'scenario_panel_tooltip'}
        isShowRevenue={true}
        isShowToday={true}
        visitationData={[]}
        forecastData={[]}
        scenarioData={[]}
        businessLines={[]}
      />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('renders with data', () => {
    const visitationData = [
      { recordDate: '2020-01-01', count: 1124 },
      { recordDate: '2020-01-02', count: 1224 },
      { recordDate: '2020-01-03', count: 1204 },
    ];
    const forecastData = [
      { recordDate: '2020-05-01', count: 133 },
      { recordDate: '2020-05-02', count: 177 },
      { recordDate: '2020-05-03', count: 234 },
    ];
    const scenarioData = [
      { recordDate: '2020-05-01', count: 55 },
      { recordDate: '2020-05-02', count: 45 },
      { recordDate: '2020-05-03', count: 104 },
    ];

    const renderer = new ShallowRenderer();
    renderer.render(
      <Scenario
        title={'scenario_panel_title'}
        tooltip={'scenario_panel_tooltip'}
        isShowRevenue={true}
        isShowToday={true}
        visitationData={visitationData}
        forecastData={forecastData}
        scenarioData={scenarioData}
        businessLines={[]}
      />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
