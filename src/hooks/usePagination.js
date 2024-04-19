import { useCallback, useMemo, useState } from 'react';

export const usePagination = () => {
  const rowsPerPageOptions = [5, 10, 25, { label: 'All', value: -1 }];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  const pageForServer = useMemo(() => page - 1, [page]);
  const updateRowsPerPage = useCallback((event) => {
    const selectedRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setPage(1);
  }, []);
  return {
    size: rowsPerPage,
    page,
    pageForServer,
    setPage,
    rowsPerPage,
    rowsPerPageOptions,
    updateRowsPerPage,
  };
};
