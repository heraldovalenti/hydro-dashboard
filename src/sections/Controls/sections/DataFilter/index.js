import React from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import RadioGroup from '../../../../components/RadioGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { intervalFilterActions } from '../../../../reducers/intervalFilter';
import { useTranslation } from 'react-i18next';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

const DataFilter = (props) => {
  const {
    dateFrom,
    dateTo,
    hours,
    intervalFilterActions: { lastHours, customInterval },
  } = props;
  const { t } = useTranslation();
  const hourOptions = [1, 3, 6, 12, 24, 48, 168, 0].map((hourOption) => {
    return {
      label: t(`control_panel_filters_last_${hourOption}_hours`),
      value: hourOption,
    };
  });
  const isCustomInterval = hours === 0;
  const handleRadioChange = (hourOption) => {
    // WARNING: hourOption received is a string, not a number
    const hours = Number.parseInt(hourOption);
    if (hours !== 0) lastHours(hours);
    else customInterval({ dateFrom, dateTo });
  };
  return (
    <CollapsiblePanel title={t('control_panel_filters_title')} expanded>
      <div style={{ width: '100%' }} className="control-panel">
        <RadioGroup
          items={hourOptions}
          onChange={handleRadioChange}
          value={hours}
        />
        <KeyboardDateTimePicker
          label={t('control_panel_filters_from')}
          ampm={false}
          variant="inline"
          format="DD/MM/YYYY HH:mm"
          defaultValue={dateFrom}
          value={dateFrom}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          // invalidDateMessage={`The From date could not be after today's date.`}
          // disableToolbar={true}
          autoOk={true}
          onChange={(newDate) =>
            customInterval({ dateFrom: new Date(newDate), dateTo })
          }
          readOnly={!isCustomInterval}
        />
        <KeyboardDateTimePicker
          label={t('control_panel_filters_to')}
          ampm={false}
          variant="inline"
          format="DD/MM/YYYY HH:mm"
          defaultValue={dateTo}
          value={dateTo}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          // invalidDateMessage={`The From date could not be after today's date.`}
          disableToolbar={true}
          autoOk={true}
          onChange={(newDate) =>
            customInterval({ dateFrom, dateTo: new Date(newDate) })
          }
          readOnly={!isCustomInterval}
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
