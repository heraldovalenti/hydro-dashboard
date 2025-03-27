import React, { useState, useCallback, useMemo } from 'react';
import { Observations } from './Observations';
import { Close, GpsFixed } from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';
import { isHQModelStationDataOrigin } from './stationUtil';
import { StationOriginLink } from './StationOriginLink';
import { useStationFocus } from '../../hooks/useStationFocus';

export const StationInfo = ({
  station,
  dateFrom,
  dateTo,
  accumulation,
  onClose,
}) => {
  const { focusStation } = useStationFocus();
  const navigateToStation = useCallback(() => {
    focusStation(station);
    onClose();
  }, [onClose, station, focusStation]);
  const stationDataOrigins = useMemo(() => {
    return station.stationDataOriginList
      .reduce((prev, curr) => {
        const found = prev.find(
          (sdo) => sdo.dimension.id === curr.dimension.id
        );
        if (!found) prev.push(curr);
        return prev;
      }, [])
      .sort((sdo1, sdo2) => sdo1.dimension.id - sdo2.dimension.id);
  }, [station.stationDataOriginList]);
  const [selectedSdoId, setSelectedSdoId] = useState(stationDataOrigins[0].id);
  const handleChange = useCallback((_event, newSdoId) => {
    setSelectedSdoId(newSdoId);
  }, []);
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'h4'} style={{ flex: 1 }}>
          {station.description}
        </Typography>
        <Box id="actions">
          <IconButton onClick={navigateToStation}>
            <GpsFixed />
          </IconButton>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <StationOriginLink station={station} />
      </Box>
      <Box>
        <Tabs value={selectedSdoId} onChange={handleChange}>
          {stationDataOrigins.map((sdo) => {
            let label = sdo.dimension.description;
            if (isHQModelStationDataOrigin(sdo)) label = `${label} (HQ)`;
            return <Tab key={sdo.id} value={sdo.id} label={label} />;
          })}
        </Tabs>
        {stationDataOrigins.map((sdo) => (
          <Box key={sdo.id} hidden={sdo.id !== selectedSdoId}>
            <Observations
              sdo={sdo}
              stationId={station.id}
              dateFrom={dateFrom}
              dateTo={dateTo}
              accumulation={accumulation}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
