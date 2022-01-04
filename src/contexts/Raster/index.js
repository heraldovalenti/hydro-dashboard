import React, { createContext, useContext, useState, useEffect } from 'react';
import { allRasters } from '../../services/Rasters';

const RasterContext = createContext({});

export const RasterProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [rastersData, setRastersData] = useState([]);
  const [selectedRaster, setSelectedRaster] = useState({
    Data: [],
  });
  const [showRaster, setShowRaster] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const response = await allRasters();
      setLoading(false);
      setRastersData(response);
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
