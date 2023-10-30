import React, { useState, useEffect, useCallback } from 'react';
import { fetchSDOObservations } from '../../services/backend';
import Pagination from '@material-ui/lab/Pagination';
import ObservationTable from './ObservationTable';
import { Box } from '@material-ui/core';
import ObservationsHeader from './ObservationsHeader';
import { ObservationsChart } from './ObservationsChart';

export default ({ stationId, sdo, dateFrom, dateTo, accumulation }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [observations, setObservations] = useState([]);
  const [allObservations, setAllObservations] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchObservationsPage = useCallback(
    async (_page, size) => {
      const result = await fetchSDOObservations(
        stationId,
        sdo,
        dateFrom,
        dateTo,
        _page,
        size
      );
      return result;
    },
    [dateFrom, dateTo, sdo, stationId]
  );

  useEffect(() => {
    const loadObservations = async () => {
      setLoading(true);
      const result = await fetchObservationsPage(page);
      setObservations(result.content);
      setTotalPages(result.totalPages);
      setLoading(false);
    };
    loadObservations();
  }, [fetchObservationsPage, page]);

  useEffect(() => {
    const loadAllObservations = async () => {
      const result = await fetchObservationsPage(1, 1000);
      setAllObservations(result.content);
      setLoadingAll(false);
    };
    loadAllObservations();
  }, [fetchObservationsPage]);

  return (
    <Box style={{ flex: 1 }}>
      <Box>
        <ObservationsHeader
          {...{ stationId, sdo, dateFrom, dateTo, accumulation }}
        />
        <ObservationsChart
          observations={allObservations}
          loading={loadingAll}
        />
        <ObservationTable observations={observations} loading={loading} />
        <Pagination
          style={{ marginTop: 10 }}
          count={totalPages}
          page={page}
          color="primary"
          onChange={(_e, _page) => setPage(_page)}
        />
      </Box>
    </Box>
  );
};
