import React, { useCallback, useRef } from 'react';
import { HeatMap } from 'google-maps-react';
import { useRasterContext } from '../contexts/Raster';
import { useSelector } from 'react-redux';

export const useRasters = () => {
  const { zoom: initialZoom, center: initialCenter } = useSelector(
    (state) => state.mapPosition
  );
  const mapPosition = useRef({ zoom: initialZoom, center: initialCenter })
    .current;
  const {
    showRaster,
    selectedRaster,
    opacity,
    gradientColors,
  } = useRasterContext();
  const renderRaster = useCallback(() => {
    if (!showRaster || !selectedRaster?.fileData) {
      return null;
    }
    const { Data = [] } = selectedRaster.fileData;
    const squareSize = 0.06;
    const init = { lng: -67.02585177951389, lat: -23.01110230836036 };
    const max = Data.reduce((m, x) => Math.max(m, x), Number.MIN_VALUE);
    const points = Data.map((pointValue, index) => {
      const row = index / 60;
      const col = index % 60;
      const lat = init.lat - row * squareSize * 0.6;
      const lng = init.lng + col * squareSize;

      return { weight: pointValue, lat, lng };
    });

    // zooms> z=5/r=3 z=6/r=6 z=7/r=10 z=8/r=18 z=9/r=30(32)
    const zoomRadius = {
      [5]: 3,
      [6]: 6,
      [7]: 10,
      [8]: 18,
      [9]: 32,
    };
    const zoom = mapPosition.zoom;
    let radius = 3;
    if (zoom >= 5 && zoom <= 9) radius = zoomRadius[zoom];
    else if (zoom > 9) radius = 32;
    const gradient = [
      'rgba(0, 124, 255, 0.1)',
      ...gradientColors.slice(
        0,
        (max / gradientColors.length) * (100 / gradientColors.length)
      ),
    ];
    return (
      <HeatMap
        opacity={opacity / 100}
        positions={points}
        radius={radius}
        disipating={false}
        gradient={gradient}
      />
    );
  }, [gradientColors, opacity, selectedRaster.fileData, showRaster]);
  return {
    showRaster,
    selectedRaster,
    opacity,
    gradientColors,
    renderRaster,
  };
};
