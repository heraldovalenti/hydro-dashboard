import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRasterContext } from '../providers/RastersProvider';
import { transformRasterData } from '../utils/transformRasterData';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

export const useRasters = () => {
  const [limitsOn, setLimitsOn] = useState(false);
  const toggleLimits = useCallback(() => setLimitsOn(!limitsOn), [limitsOn]);
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
  const mapRef = useMap();
  const markerLib = useMapsLibrary('marker');

  useEffect(() => {
    if (!mapRef || !markerLib || !limitsOn) {
      return;
    }
    const limitMarkers = limits.map(({ lat, lng }, index) => {
      return new google.maps.marker.AdvancedMarkerElement({
        map: mapRef,
        position: { lat, lng },
        title: `#${index} lat=${lat} lng=${lng}`,
      });
    });
    return () => {
      limitMarkers.forEach((lm) => {
        lm.setMap(null);
      });
    };
  }, [limits, limitsOn, mapRef, markerLib]);

  useEffect(() => {
    console.log({ showRaster, selectedRaster });
    if (!mapRef || !showRaster || !selectedRaster?.fileData) {
      return;
    }
    const { Data = [], Width, Height } = selectedRaster.fileData;
    const [init, , , end] = limits;
    const points = transformRasterData(init, end, { Data, Height, Width });

    const { lat: initLat, lng: initLng } = init;
    const { lat: endLat, lng: endLng } = end;
    const widthDiff = Math.abs((endLng - initLng) / Width) / 1;
    const heightDiff = Math.abs((endLat - initLat) / Height) / 1;

    const rasterComponents = points.map((point) => {
      const { lat, lng, weight } = point;
      let color = gradientColors[0];
      if (weight > 0 && weight < 100) {
        color = gradientColors[Math.floor(weight / 5)];
      } else if (weight >= 100) {
        color = gradientColors[gradientColors.length];
      }
      return new google.maps.Rectangle({
        bounds: {
          north: lat,
          south: lat - heightDiff,
          east: lng + widthDiff,
          west: lng,
        },
        map: mapRef,
        strokeOpacity: 0,
        fillColor: color,
        fillOpacity: opacity / 100,
      });
    });
    return () => {
      rasterComponents.forEach((rc) => {
        rc.setMap(null);
      });
    };
  }, [
    gradientColors,
    limits,
    mapRef,
    opacity,
    selectedRaster,
    selectedRaster.fileData,
    showRaster,
  ]);

  return {
    showRaster,
    selectedRaster,
    opacity,
    gradientColors,
    toggleLimits,
  };
};
