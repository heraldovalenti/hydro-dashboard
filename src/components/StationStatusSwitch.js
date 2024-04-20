import React, { useCallback, useState } from 'react';
import { CircularProgress, Switch } from '@material-ui/core';
import { activateStation, deactivateStation } from '../services/stations';

export const StationStatusSwitch = ({ station }) => {
  const [loading, setLoading] = useState(false);
  const { id } = station;
  const [status, setStatus] = useState(station.active);
  const onChange = useCallback(async () => {
    setLoading(true);
    const result = status
      ? await deactivateStation(id)
      : await activateStation(id);
    if (result) setStatus(result.active);
    setLoading(false);
  }, [id, status]);
  if (loading) {
    return <CircularProgress color="primary" />;
  }
  return (
    <Switch
      disabled={loading}
      checked={status}
      color="primary"
      onChange={onChange}
    />
  );
};
