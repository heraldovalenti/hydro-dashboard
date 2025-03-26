import { useEffect } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useBasinFilter } from '../../hooks/useBasinFilter';
import { useAppData } from '../../providers/AppDataProvider';
import { useMap } from '@vis.gl/react-google-maps';

export const useRenderBasins = () => {
  const { showBasins } = useStationFilters();
  const { basins } = useAppData();
  const { shouldHideBasin } = useBasinFilter();

  const mapRef = useMap();
  useEffect(() => {
    if (!mapRef || !showBasins) {
      return;
    }
    const polygons = basins.map((basin) => {
      const { id, color, path } = basin;
      if (shouldHideBasin(id)) {
        return null;
      }
      return new google.maps.Polygon({
        clickable: false,
        map: mapRef,
        paths: path.map((point) => ({
          lng: Number.parseFloat(point.lng),
          lat: Number.parseFloat(point.lat),
        })),
        strokeColor: '#666',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.2,
      });
    });
    return () => {
      polygons.forEach((p) => p && p.setMap(null));
    };
  }, [showBasins, basins, shouldHideBasin, mapRef]);

  return {};
};
