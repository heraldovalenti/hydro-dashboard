import React, { createContext, useContext, useState } from 'react';

const RasterContext = createContext({});

export const RasterProvider = ({ children }) => {
  const [rasterData, setRasterData] = useState({ floatArray: [] });
  const [showRaster, setShowRaster] = useState(false);
  return (
    <RasterContext.Provider
      value={{
        showRaster,
        setShowRaster,
        rasterData,
        setRasterData,
      }}
    >
      {children}
    </RasterContext.Provider>
  );
};

export const useRaster = () => {
  const context = useContext(RasterContext);
  if (!context) {
    throw new Error('useRaster must be used inside a RasterProvider');
  }
  return context;
};
