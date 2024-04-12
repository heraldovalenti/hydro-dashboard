import React, { createContext, useContext, useState, useMemo } from 'react';
import { allRasters, rasterTypes } from '../services/Rasters';
import { useQuery } from 'react-query';
import { queryKeys } from '../constants/queryKeys';

const RasterContext = createContext({});
const gradientColors = [
  '#0044ff',
  '#0088ff',
  '#00bbff',
  '#00ffff',
  '#00ffbb',
  '#00ff88',

  '#00ff00',

  '#44ff00',
  '#88ff00',
  '#bbff00',

  '#ffff00',

  '#ffbb00',
  '#ff8800',
  '#ff4400',

  '#ff0000',

  '#dd0000',
  '#aa0000',
  '#880000',
  '#660000',
  '#440000',
  '#220000',
];
export const RasterProvider = ({ children }) => {
  const [selectedRaster, setSelectedRaster] = useState({
    Data: [],
  });
  const [showRaster, setShowRaster] = useState(false);
  const [opacity, setOpacity] = useState(80);
  const [radius, setRadius] = useState(20);

  const reactQueryOptions = {
    cacheTime: 600_000,
    staleTime: 600_000,
  };
  const { data: wrfData = [], isLoading: wrfLoading } = useQuery(
    [queryKeys.RASTERS_WRF],
    async () => {
      const rasters = await allRasters({ type: rasterTypes.WRF });
      return rasters.fileList;
    },
    reactQueryOptions
  );

  const { data: sqpeData = [], isLoading: sqpeLoading } = useQuery(
    [queryKeys.RASTERS_SQPE],
    async () => {
      const rasters = await allRasters({ type: rasterTypes.SQPE });
      return rasters.fileList;
    },
    reactQueryOptions
  );

  const { data: acumData = [], isLoading: acumLoading } = useQuery(
    [queryKeys.RASTERS_ACUM],
    async () => {
      const rasters = await allRasters({ type: rasterTypes.ACUM });
      return rasters.fileList;
    },
    reactQueryOptions
  );
  const rastersData = useMemo(
    () => [...wrfData, ...sqpeData, ...acumData],

    [wrfData, sqpeData, acumData]
  );

  return (
    <RasterContext.Provider
      value={{
        rastersData,
        showRaster,
        setShowRaster,
        selectedRaster,
        setSelectedRaster,
        opacity,
        setOpacity,
        radius,
        setRadius,
        gradientColors,
        wrfData,
        wrfLoading,
        sqpeData,
        sqpeLoading,
        acumData,
        acumLoading,
      }}
    >
      {children}
    </RasterContext.Provider>
  );
};

export const useRasterContext = () => {
  const context = useContext(RasterContext);
  if (!context) {
    throw new Error('useRaster must be used inside a RasterProvider');
  }
  return context;
};
