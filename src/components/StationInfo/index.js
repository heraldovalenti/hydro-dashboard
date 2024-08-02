import React, { useState, useCallback } from 'react';
import Observations from './Observations';
import { Close, GpsFixed } from '@material-ui/icons';
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  AppBar,
  IconButton,
} from '@material-ui/core';
import { isHQModelStationDataOrigin } from './stationUtil';
import { StationOriginLink } from './StationOriginLink';
import { useStationFocus } from '../../hooks/useStationFocus';

const StationInfo = ({ station, dateFrom, dateTo, accumulation, onClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const observationProps = {
    stationId: station.id,
    dateFrom,
    dateTo,
    accumulation,
  };
  const { focusStation } = useStationFocus();
  const navigateToStation = useCallback(() => {
    focusStation(station);
    onClose();
  }, [onClose, station, focusStation]);
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
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            {station.stationDataOriginList.map((sdo, i) => {
              let label = sdo.dimension.description;
              if (isHQModelStationDataOrigin(sdo)) label = `${label} (HQ)`;
              return <Tab key={i} {...{ label }} />;
            })}
          </Tabs>
        </AppBar>
        {station.stationDataOriginList.map((sdo, i) => (
          <Box key={i} hidden={value !== i}>
            <Observations sdo={sdo} {...observationProps} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default StationInfo;
