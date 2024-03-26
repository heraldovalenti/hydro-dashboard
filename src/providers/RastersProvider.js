import React, { createContext, useContext, useState, useEffect } from 'react';
import { allRasters, rasterTypes } from '../services/Rasters';

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
  const [loading, setLoading] = useState(true);
  const [rastersData, setRastersData] = useState([]);
  const [selectedRaster, setSelectedRaster] = useState({
    Data: [],
  });
  const [showRaster, setShowRaster] = useState(false);
  const [opacity, setOpacity] = useState(80);
  const [radius, setRadius] = useState(20);
  useEffect(() => {
    const fetch = async () => {
      const response = await Promise.all([
        allRasters({ type: rasterTypes.WRF }),
        allRasters({ type: rasterTypes.SQPE }),
        allRasters({ type: rasterTypes.ACUM }),
      ]);
      const [r1, r2, r3] = response;
      setLoading(false);
      setRastersData([...r1.fileList, ...r2.fileList, ...r3.fileList]);
    };
    fetch();
  }, []);
  return (
    <RasterContext.Provider
      value={{
        loading,
        showRaster,
        setShowRaster,
        rastersData,
        selectedRaster,
        setSelectedRaster,
        opacity,
        setOpacity,
        radius,
        setRadius,
        gradientColors,
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
