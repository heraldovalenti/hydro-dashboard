import { useCallback, useState } from 'react';
// import { useTranslation } from 'react-i18next';

export const usePagination = () => {
  // const { t } = useTranslation();
  const rowsPerPageOptions = [
    5,
    10,
    25,
    // { label: t('pagination_all_elements'), value: -1 },
  ];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [page, setPage] = useState(0);
  const updateRowsPerPage = useCallback((event) => {
    const selectedRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(selectedRowsPerPage);
    setPage(0);
  }, []);
  return {
    size: rowsPerPage,
    page,
    pageForServer: page,
    setPage,
    rowsPerPage,
    rowsPerPageOptions,
    updateRowsPerPage,
  };
};
