import React, { useContext } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import LabelValueRow from '../../components/LabelValueRow';
import RadioGroup from '../../../../components/RadioGroup';
import { StoreContext } from '../../../../store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { intervalFilterActions } from '../../../../reducers/intervalFilter';
import { useTranslation } from 'react-i18next';
import { getAesDateString, plusDays, now } from '../../../../utils/date';

const DataFilter = (props) => {
  const {} = useContext(StoreContext);
  const dateFrom = plusDays(now(), -30);
  const dateTo = now();
  const {
    hours,
    intervalFilterActions: { lastHours, customInterval },
  } = props;
  const { t } = useTranslation();
  const hourOptions = [1, 3, 6, 12, 24, 48, 168, 0];
  return (
    <CollapsiblePanel title={t('control_panel_filters_title')} expanded>
      <div style={{ width: '100%' }} className="control-panel">
        <RadioGroup
          items={hourOptions.map((hourOption) => {
            return {
              label: t(`control_panel_filters_last_${hourOption}_hours`),
              value: `${hourOption}`, // value needs to be a string, otherwise selection is not rendered properly
            };
          })}
          onChange={(hourOption) => {
            lastHours(hourOption);
            // if (hourOption == 0) customInterval();
          }}
          value={hours}
        />
        <LabelValueRow
          label={'Desde'}
          value={getAesDateString(dateFrom)}
          // setValue={(x) => setDateFrom(x)}
        />
        <LabelValueRow
          label={'Hasta'}
          value={getAesDateString(dateTo)}
          // setValue={(x) => setDateTo(x)}
        />
      </div>
    </CollapsiblePanel>
  );
};
const mapStateToProps = (state) => {
  return {
    hours: state.intervalFilter.hours,
    dateFrom: state.intervalFilter.dateFrom,
    dateTo: state.intervalFilter.dateTo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    intervalFilterActions: bindActionCreators(
      { ...intervalFilterActions },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFilter);
