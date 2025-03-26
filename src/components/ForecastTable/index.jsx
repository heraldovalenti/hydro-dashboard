import React, { useEffect, useState, useCallback } from 'react';
import { Refresh, Close } from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ForecastTable from './ForecastTable';
import { fetchForecast } from '../../services/backend';
import { useAppData } from '../../providers/AppDataProvider';
import { getAesTimeString } from '../../utils/date';

const useForecast = () => {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState({ forecasts: [], time: null });

  const loadForecast = useCallback(async (refresh = false) => {
    const responseForecast = await fetchForecast(refresh);
    setForecast(responseForecast);
    setLoading(false);
  }, []);

  const reloadForecast = useCallback(
    async (refresh = false) => {
      if (!loading) {
        setLoading(true);
        loadForecast(refresh);
      }
    },
    [loadForecast, loading]
  );

  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  return {
    loading,
    forecast,
    reloadForecast,
  };
};

const ForecastInfo = ({ onClose }) => {
  const { loading: appLoading } = useAppData();
  const { loading, forecast, reloadForecast } = useForecast();

  const { t } = useTranslation();
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'h4'} style={{ flex: 1 }}>
          {t('forecast_page_title')}
        </Typography>
        <Box id="actions">
          <IconButton onClick={() => reloadForecast(true)}>
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
