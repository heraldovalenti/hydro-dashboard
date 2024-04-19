import { useCallback, useMemo, useState } from 'react';

export const useSort = (fields) => {
  const [defaultSort] = fields;
  const [field, setField] = useState(defaultSort);
  const [direction, setDirection] = useState('asc');
  const asc = useCallback(() => setDirection('asc'), []);
  const desc = useCallback(() => setDirection('desc'), []);
  const toggleDirection = useCallback(
    () => (direction === 'asc' ? desc() : asc()),
    [asc, desc, direction]
  );
  const isActiveSort = useCallback((selectedField) => field === selectedField, [
    field,
  ]);
  const sortBy = useCallback(
    (selectedField) => {
      if (isActiveSort(selectedField)) {
        toggleDirection();
      } else {
        asc();
        setField(selectedField);
      }
    },
    [asc, isActiveSort, toggleDirection]
  );
  const sort = useMemo(() => `${field},${direction}`, [field, direction]);
  return {
    field,
    sortBy,
    direction,
    sort,
    asc,
    desc,
    toggleDirection,
    isActiveSort,
  };
};
