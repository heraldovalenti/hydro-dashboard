import React, { useState, useEffect, useMemo } from 'react';
import { fetchSDOObservations } from '../../services/backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import ObservationTable from './ObservationTable';
import { Box } from '@material-ui/core';
import ObservationsHeader from './ObservationsHeader';
import { ObservationsChart } from './ObservationsChart';

export default ({ stationId, sdo, dateFrom, dateTo, accumulation }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const loadObservations = async () => {
      if (!loading) {
        setLoading(true);
        const observationsData = await fetchSDOObservations(
          stationId,
          sdo,
          dateFrom,
          dateTo,
          page
        );
        setObservations(observationsData.content);
        setTotalPages(observationsData.totalPages);
        setLoading(false);
      }
    };
    loadObservations();
  }, [page]);
  const chart = useMemo(() => {
    return <ObservationsChart {...{ stationId, sdo, dateFrom, dateTo }} />;
  }, [stationId, sdo, dateFrom, dateTo]);
  return (
    <Box style={{ flex: 1 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <Box>
          <ObservationsHeader
            {...{ stationId, sdo, dateFrom, dateTo, accumulation }}
          />
          {chart}
          <ObservationTable observations={observations} />
          <Pagination
            style={{ marginTop: 10 }}
            count={totalPages}
            page={page}
            color="primary"
            onChange={(_e, page) => setPage(page)}
          />
        </Box>
      )}
    </Box>
  );
};
