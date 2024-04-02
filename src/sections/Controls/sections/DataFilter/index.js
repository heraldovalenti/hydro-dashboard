import React, { useEffect, useState } from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import RadioGroup from '../../../../components/RadioGroup';
import { useTranslation } from 'react-i18next';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { isValidDate } from '../../../../utils/date';
import { useAccumulationData } from '../../../../hooks/useAccumulationData';
import { useLatestObservations } from '../../../../hooks/useLatestObservations';
import { useDateInterval } from '../../../../hooks/useDateInterval';

const DataFilter = () => {
  const { isLoading: isAccumulationDataLoading } = useAccumulationData();
  const { isLoading: isLatestObservationsLoading } = useLatestObservations();
  const { from, to, hours, updateInterval } = useDateInterval();
  const loading = isAccumulationDataLoading || isLatestObservationsLoading;
  const { t } = useTranslation();
  const hourOptions = [1, 3, 6, 12, 24, 48, 168, 0].map((hourOption) => {
    return {
      label: t(`control_panel_filters_last_${hourOption}_hours`),
      value: hourOption,
    };
  });
  const [localDateTo, setLocalDateTo] = useState(to);
  const [localDateFrom, setLocalDateFrom] = useState(from);
  const isCustomInterval = hours === 0;
  useEffect(() => {
    setLocalDateTo(to);
    setLocalDateFrom(from);
  }, [from, to]);
  const handleRadioChange = (hourOption) => {
    updateInterval({
      // WARNING: hourOption received is a string, not a number
      hours: Number.parseInt(hourOption),
      from,
      to,
    });
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
          value={localDateFrom}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          invalidDateMessage={t('control_panel_invalid_date_message')}
          autoOk
          onChange={(newDateRaw) => {
            const newDate = new Date(newDateRaw);
            setLocalDateFrom(newDate);
            if (isValidDate(newDate)) {
              updateInterval({ from: newDate, to });
            }
          }}
          readOnly={!isCustomInterval}
          disabled={loading}
        />
        <KeyboardDateTimePicker
          label={t('control_panel_filters_to')}
          ampm={false}
          variant="inline"
          format="DD/MM/YYYY HH:mm"
          value={localDateTo}
          // maxDate={startMaxDate}
          // maxDateMessage={`The From date could not be after today's date.`}
          invalidDateMessage={t('control_panel_invalid_date_message')}
          autoOk
          onChange={(newDateRaw) => {
            const newDate = new Date(newDateRaw);
            setLocalDateTo(newDate);
            if (isValidDate(newDate)) {
              updateInterval({ from, to: newDate });
            }
          }}
          readOnly={!isCustomInterval}
          disabled={loading}
        />
      </div>
    </CollapsiblePanel>
  );
};

export default DataFilter;
