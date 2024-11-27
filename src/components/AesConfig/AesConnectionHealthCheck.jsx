import React from 'react';
import { IconButton, CircularProgress, Typography, Grid } from '@mui/material';
import { NetworkCheck, Update } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import {
  useLatestDataHealthCheck,
  useUpdateAesObservations,
  statusCodes,
} from '../../hooks/aes';

export const AesConnectionHealthCheck = () => {
  const { t } = useTranslation();
  const {
    check,
    loading,
    status: healthCheckStatus,
  } = useLatestDataHealthCheck();
  const { update, updating, status: statusUpdate } = useUpdateAesObservations();
  if (loading || updating) {
    return <CircularProgress />;
  }
  const iconColor = {
    [statusCodes.NONE]: 'action',
    [statusCodes.OK]: 'primary',
    [statusCodes.UNAUTHORIZED]: 'error',
    [statusCodes.UNKNOWN]: 'secondary',
  };
  return (
    <>
      <Grid item xs={6}>
        <IconButton onClick={() => check()}>
          <Typography variant="h6">
            {t('app_config_aes_action_health_check')}
          </Typography>
          <NetworkCheck color={iconColor[healthCheckStatus]} />
        </IconButton>
      </Grid>

      <Grid item xs={6}>
        <IconButton onClick={() => update()}>
          <Typography variant="h6">
            {t('app_config_aes_action_update_observations')}
          </Typography>
          <Update color={iconColor[statusUpdate]} />
        </IconButton>
      </Grid>
    </>
  );
};
