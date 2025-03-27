import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Typography, IconButton } from '@mui/material';
import { getHoursApart } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import { exportObservations } from '../../services/backend';
import {
  isFlowDimension,
  isLevelDimension,
  isRainDimension,
} from '../../utils/dimension';
import { isHQModelStationDataOrigin } from '../../utils/stationDataOrigin';

export const ObservationsHeader = ({
  stationId,
  sdo,
  dateFrom,
  dateTo,
  accumulation,
}) => {
  const { t } = useTranslation();
  const hours = getHoursApart(dateFrom, dateTo);
  let summary = ' ';
  if (isRainDimension(sdo.dimension)) {
    const unit = 'mm';
    summary = t('rain_info_summary', { hours, accumulation, unit });
  } else if (isLevelDimension(sdo.dimension)) {
    summary = t('level_info_summary', { hours });
  } else if (isFlowDimension(sdo.dimension)) {
    const isHQModel = isHQModelStationDataOrigin(sdo);
    summary = isHQModel
      ? t('flow_info_summary_hq_model', { hours })
      : t('flow_info_summary', { hours });
  }

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant={'h6'} style={{ flex: 1 }}>
        {summary}
      </Typography>
      <Box id="actions">
        <IconButton
          onClick={() =>
            exportObservations(stationId, sdo.dimension.id, dateFrom, dateTo)
          }
        >
          <CloudDownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
