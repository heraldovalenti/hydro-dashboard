import React, { useEffect, useState } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import RadioGroup from '../../../../components/RadioGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { intervalFilterActions } from '../../../../reducers/intervalFilter';
import { useTranslation } from 'react-i18next';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { isValidDate } from '../../../../utils/date';

const DataFilter = (props) => {
  const {
    dateFrom,
    dateTo,
    hours,
    intervalFilterActions: { lastHours, customInterval },
    loading,
  } = props;
  const { t } = useTranslation();
  const hourOptions = [1, 3, 6, 12, 24, 48, 168, 0].map((hourOption) => {
    return {
      label: t(`control_panel_filters_last_${hourOption}_hours`),
      value: hourOption,
    };
  });
  const [localDateTo, setLocalDateTo] = useState(dateTo);
  const [localDateFrom, setLocalDateFrom] = useState(dateFrom);
  const isCustomInterval = hours === 0;
  useEffect(() => {
    setLocalDateTo(dateTo);
    setLocalDateFrom(dateFrom);
  }, [dateFrom, dateTo]);
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
          disabled={loading}
        />
        <KeyboardDateTimePicker
          label={t('control_panel_filters_from')}
          ampm={false}
          variant="inline"
          format="DD/MM/YYYY HH:mm"
          defaultValue={dateFrom}
          value={localDateFrom}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          invalidDateMessage={t('control_panel_invalid_date_message')}
          autoOk={true}
          onChange={(newDateRaw) => {
            const newDate = new Date(newDateRaw);
            setLocalDateFrom(newDate);
            isValidDate(newDate) &&
              customInterval({ dateFrom: newDate, dateTo });
          }}
          readOnly={!isCustomInterval}
          disabled={loading}
        />
        <KeyboardDateTimePicker
          label={t('control_panel_filters_to')}
          ampm={false}
          variant="inline"
          format="DD/MM/YYYY HH:mm"
          defaultValue={dateTo}
          value={localDateTo}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          invalidDateMessage={t('control_panel_invalid_date_message')}
          autoOk={true}
          onChange={(newDateRaw) => {
            const newDate = new Date(newDateRaw);
            setLocalDateTo(newDate);
            isValidDate(newDate) &&
              customInterval({ dateFrom, dateTo: newDate });
          }}
          readOnly={!isCustomInterval}
          disabled={loading}
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
    loading: state.accumulationData.loading,
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
