import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePersistentConfig = (key: string, defaultValue?: string) => {
  const [config, setConfig] = useState(defaultValue || '');

  const reloadConfig = useCallback(() => {
    const value = localStorage.getItem(key);
    if (value) {
      setConfig(value);
    }
  }, [key]);

  const updateConfig = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
      reloadConfig();
    },
    [key, reloadConfig]
  );

  useEffect(() => {
    reloadConfig();
  }, [reloadConfig]);

  const isEmpty = useMemo(() => !config, [config]);

  return {
    isEmpty,
    config,
    updateConfig,
  };
};
