import React, { useCallback, useMemo } from 'react';
import { useRasterContext } from '../providers/RastersProvider';
import { transformRasterData } from '../utils/transformRasterData';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Rectangle } from '../components/Map/Rectangle';

export const useRasters = () => {
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
    return limits.map(({ lat, lng }, index) => {
      return (
        <AdvancedMarker
          key={`${lat}_${lng}`}
          position={{ lat, lng }}
          label={`#${index} lat=${lat} lng=${lng}`}
        />
      );
    });
  }, [limits]);

  const renderRasterV2 = useCallback(() => {
    if (!showRaster || !selectedRaster?.fileData) {
      return null;
    }
    const { Data = [], Width, Height } = selectedRaster.fileData;
    const [init, , , end] = limits;
    const points = transformRasterData(init, end, { Data, Height, Width });

    const { lat: initLat, lng: initLng } = init;
    const { lat: endLat, lng: endLng } = end;
    const widthDiff = Math.abs((endLng - initLng) / Width) / 1;
    const heightDiff = Math.abs((endLat - initLat) / Height) / 1;

    return points.map((point) => {
      const { lat, lng, weight } = point;
      let color = gradientColors[0];
      if (weight > 0 && weight < 100) {
        color = gradientColors[Math.floor(weight / 5)];
      } else if (weight >= 100) {
        color = gradientColors[gradientColors.length];
      }
      return (
        <Rectangle
          key={`${lat}_${lng}`}
          bounds={{
            north: lat,
            south: lat - heightDiff,
            east: lng + widthDiff,
            west: lng,
          }}
          label={`${weight}`}
          strokeOpacity={0}
          fillColor={color}
          fillOpacity={opacity / 100}
        />
      );
    });
  }, [gradientColors, limits, opacity, selectedRaster.fileData, showRaster]);

  return {
    showRaster,
    selectedRaster,
    opacity,
    gradientColors,
    renderLimits,
    renderRasterV2,
  };
};
