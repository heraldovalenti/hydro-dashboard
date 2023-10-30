import React, { useEffect, useState, useCallback } from 'react';
import { Refresh, Close } from '@material-ui/icons';
import {
  Box,
  Container,
  Typography,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ForecastTable from './ForecastTable';
import { fetchForecast } from '../../services/backend';
import { useAppData } from '../../providers/AppDataProvider';
import { getAesTimeString } from '../../utils/date';

const ForecastInfo = ({ onClose }) => {
  const { loading: appLoading } = useAppData();
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState({ forecasts: [], time: null });
  const loadForecast = useCallback(
    async (refresh = false) => {
      if (!loading) {
        setLoading(true);
        const responseForecast = await fetchForecast(refresh);
        setForecast(responseForecast);
        setLoading(false);
      }
    },
    [loading]
  );
  useEffect(() => {
    if (!appLoading) loadForecast();
  }, [appLoading, loadForecast]);
  const { t } = useTranslation();
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'h4'} style={{ flex: 1 }}>
          {t('forecast_page_title')}
        </Typography>
        <Box id="actions">
          <IconButton onClick={() => loadForecast(true)}>
            <Refresh />
          </IconButton>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      {loading || appLoading ? (
        <Box style={{ marginTop: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box style={{ marginTop: 10 }}>
          <Typography variant={'h6'} style={{ flex: 1 }}>
            {t('forecast_page_subtitle', {
              date: getAesTimeString(forecast.time),
            })}
          </Typography>
          <ForecastTable forecast={forecast.forecasts} />
        </Box>
      )}
    </Container>
  );
};
export default ForecastInfo;
