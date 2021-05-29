import React from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Box, Typography, IconButton } from '@material-ui/core';
import {
  isRainDimension,
  isLevelDimension,
  isFlowDimension,
} from './stationUtil';
import { getHoursApart } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import { exportObservations } from '../../services/backend';

export default ({ stationId, dimensionId, dateFrom, dateTo, accumulation }) => {
  const { t } = useTranslation();
  const hours = getHoursApart(dateFrom, dateTo);
  let summary = ' ';
  if (isRainDimension(dimensionId)) {
    const unit = 'mm';
    summary = t('rain_info_summary', { hours, accumulation, unit });
  } else if (isLevelDimension(dimensionId)) {
    const hours = getHoursApart(dateFrom, dateTo);
    summary = t('level_info_summary', { hours });
  } else if (isFlowDimension(dimensionId)) {
    summary = t('flow_info_summary', { hours });
  }

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant={'h6'} style={{ flex: 1 }}>
        {summary}
      </Typography>
      <Box id="actions">
        <IconButton
          onClick={() =>
            exportObservations(stationId, dimensionId, dateFrom, dateTo)
          }
        >
          <CloudDownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
