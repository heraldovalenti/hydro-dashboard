import React, { useState } from 'react';
import Observations from './Observations';
import CloseIcon from '@material-ui/icons/Close';
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
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            {station.stationDataOriginList.map((sdo) => {
              let label = sdo.dimension.description;
              if (isHQModelStationDataOrigin(sdo)) label = `${label} (HQ)`;
              return <Tab {...{ label }} />;
            })}
          </Tabs>
        </AppBar>
        {station.stationDataOriginList.map((sdo, i) => (
          <Box hidden={value !== i}>
            <Observations sdo={sdo} {...observationProps} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default StationInfo;
