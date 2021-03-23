import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import ObservationTable from './ObservationTable';
import { fetchObservations } from '../../services/backend';
import { isWeatherStation } from './stationUtil';
import { getHoursApart } from '../../utils/date';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const RainInfo = ({ dateFrom, dateTo, accumulation }) => {
  const { t } = useTranslation();
  const hours = getHoursApart(dateFrom, dateTo);
  const unit = 'mm';
  return (
    <div>
      <h4>{t('weather_station_info_header', { hours, accumulation, unit })}</h4>
    </div>
  );
};

const LevelInfo = ({ hours, stationData }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h4>{t('hydrometric_station_info_header', { hours })}</h4>
    </div>
  );
};

const StationInfo = ({
  station,
  dateFrom,
  dateTo,
  accumulation,
  closeAction,
}) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const loadObservations = async () => {
    if (!loading) {
      setLoading(true);
      const observationsData = await fetchObservations(
        station.id,
        dateFrom,
        dateTo,
        page
      );
      setObservations(observationsData.content);
      setTotalPages(observationsData.totalPages);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadObservations();
  }, [page]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, fontSize: 'x-large', alignSelf: 'center' }}>
          {station.description}
        </div>
        <div style={{ alignSelf: 'center' }}>
          <IconButton onClick={() => closeAction()}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {loading && <CircularProgress />}
      {accumulation && isWeatherStation(station) && (
        <RainInfo
          dateFrom={dateFrom}
          dateTo={dateTo}
          accumulation={accumulation}
        />
      )}
      {/*
      {stationData && stationType === StationTypes.hydrometric && (
        <LevelInfo hours={hours} stationData={stationData} />
      )} */}
      {!loading && <ObservationTable observations={observations} />}
      <Pagination
        style={{ marginTop: 10 }}
        count={totalPages}
        page={page}
        color="primary"
        onChange={(_e, page) => setPage(page)}
      />
    </div>
  );
};

export default StationInfo;
