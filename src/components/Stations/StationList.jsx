import React from 'react';
import {
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  TablePagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close, GpsFixed } from '@mui/icons-material';
import { useAppData } from '../../providers/AppDataProvider';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { queryKeys } from '../../constants/queryKeys';
import { listStations } from '../../services/stations';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';
import { StationStatusSwitch } from '../StationStatusSwitch';
import { useStationFocus } from '../../hooks/useStationFocus';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeader: {
    fontWeight: theme.typography.fontWeightBold,
  },
  pagination: {
    marginTop: 10,
  },
}));

export const StationList = ({ onClose }) => {
  const { tableHeader, pagination } = useStyles();
  const { loading } = useAppData();

  // other sort options: type (meteorologica, hidrometrica), origin
  const sortFields = ['id', 'description', 'latitude', 'longitude', 'active'];
  const [
    idSort,
    descriptionSort,
    latitudeSort,
    longitudeSort,
    activeSort,
  ] = sortFields;
  const { sort, direction, sortBy, isActiveSort } = useSort(sortFields);
  const {
    page,
    size,
    setPage,
    rowsPerPage,
    rowsPerPageOptions,
    updateRowsPerPage,
  } = usePagination();

  const defaultStations = {
    content: [],
    totalElements: 0,
    totalPages: 0,
  };
  const { data = defaultStations, isLoading } = useQuery(
    [queryKeys.STATIONS, loading, size, page, sort],
    async () => {
      if (loading) return defaultStations;
      const result = await listStations({ size, page, sort });
      return result;
    }
  );
  const { content: stations, totalElements } = data;

  const { focusStation } = useStationFocus();

  const { t } = useTranslation();
  return (
    <Container>
      <Grid container>
        <Typography variant={'h4'} style={{ flex: 1 }}>
          {t('station_table_title')}
        </Typography>
        <Box id="actions">
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Grid>
      {(loading || isLoading) && <CircularProgress />}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={tableHeader} align="right">
                <TableSortLabel
                  active={isActiveSort(idSort)}
                  direction={direction}
                  onClick={() => sortBy(idSort)}
                >
                  {t('station_table_header_id')}
                </TableSortLabel>
              </TableCell>
              <TableCell className={tableHeader}>
                <TableSortLabel
                  active={isActiveSort(descriptionSort)}
                  direction={direction}
                  onClick={() => sortBy(descriptionSort)}
                >
                  {t('station_table_header_description')}
                </TableSortLabel>
              </TableCell>
              <TableCell className={tableHeader} align="right">
                <TableSortLabel
                  active={isActiveSort(latitudeSort)}
                  direction={direction}
                  onClick={() => sortBy(latitudeSort)}
                >
                  {t('station_table_header_latitude')}
                </TableSortLabel>
              </TableCell>
              <TableCell className={tableHeader} align="right">
                <TableSortLabel
                  active={isActiveSort(longitudeSort)}
                  direction={direction}
                  onClick={() => sortBy(longitudeSort)}
                >
                  {t('station_table_header_longitude')}
                </TableSortLabel>
              </TableCell>
              <TableCell className={tableHeader} align="right">
                <TableSortLabel
                  active={isActiveSort(activeSort)}
                  direction={direction}
                  onClick={() => sortBy(activeSort)}
                >
                  {t('station_table_header_active')}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stations.map((s) => {
              return (
                <TableRow key={s.id}>
                  <TableCell align="right">
                    <Box>
                      <IconButton onClick={() => focusStation(s)}>
                        <GpsFixed />
                      </IconButton>
                      {s.id}
                    </Box>
                  </TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell align="right">{s.latitude}</TableCell>
                  <TableCell align="right">{s.longitude}</TableCell>
                  <TableCell align="right">
                    <StationStatusSwitch station={s} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={pagination}
        count={totalElements}
        page={isLoading ? 0 : page}
        color="primary"
        onPageChange={(_event, selectedPage) => setPage(selectedPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={updateRowsPerPage}
      />
    </Container>
  );
};
