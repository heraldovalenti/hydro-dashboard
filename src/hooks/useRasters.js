import React, { useCallback, useMemo, useRef } from 'react';
import { HeatMap, Marker } from 'google-maps-react';
import { useRasterContext } from '../providers/RastersProvider';
import { useSelector } from 'react-redux';
import { transformRasterData } from '../utils/transformRasterData';

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
  const limits = useMemo(
    () => [
      { lat: -23, lng: -67 },
      { lat: -23, lng: -63.5 },
      { lat: -28, lng: -67 },
      { lat: -28, lng: -63.5 },
    ],
    []
  );
  const renderLimits = useCallback(() => {
    return limits.map(({ lat, lng }) => {
      return <Marker key={`${lat}_${lng}`} position={{ lat, lng }} />;
    });
  }, [limits]);
  const renderRaster = useCallback(() => {
    if (!showRaster || !selectedRaster?.fileData) {
      return null;
    }
    const { Data = [], Width, Height } = selectedRaster.fileData;
    const [init, , , end] = limits;
    const points = transformRasterData(init, end, { Data, Height, Width });
    const max = Data.reduce((m, x) => Math.max(m, x), Number.MIN_VALUE);

    // zooms> z=5/r=3 z=6/r=6 z=7/r=10 z=8/r=18 z=9/r=30(32)
    const zoomRadius = {
      5: 3,
      6: 6,
      7: 10,
      8: 18,
      9: 32,
    };
    const zoom = mapPosition.zoom;
    let radius = 3;
    if (zoom >= 5 && zoom <= 9) radius = zoomRadius[zoom];
    else if (zoom > 9) radius = 32;
    const gradient = [
      'rgba(0, 124, 255, 0.1)',
      ...gradientColors.slice(
        0,
        (max / gradientColors.length) * (100 / gradientColors.length) + 1
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
  }, [
    gradientColors,
    limits,
    mapPosition.zoom,
    opacity,
    selectedRaster.fileData,
    showRaster,
  ]);

  return {
    showRaster,
    selectedRaster,
    opacity,
    gradientColors,
    renderRaster,
    renderLimits,
  };
};
