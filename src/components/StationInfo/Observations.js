import React, { useState, useEffect } from 'react';
import { fetchSDOObservations } from '../../services/backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import ObservationTable from './ObservationTable';
import { Box } from '@material-ui/core';
import ObservationsHeader from './ObservationsHeader';

export default ({ stationId, sdo, dateFrom, dateTo, accumulation }) => {
  const { id: dimensionId } = sdo.dimension;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
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
  useEffect(() => {
    loadObservations();
  }, [page]);
  return (
    <Box style={{ flex: 1 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <Box>
          <ObservationsHeader
            {...{ stationId, sdo, dateFrom, dateTo, accumulation }}
          />
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
