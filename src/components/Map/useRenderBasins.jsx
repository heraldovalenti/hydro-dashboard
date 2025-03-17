import { useCallback } from 'react';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useBasinFilter } from '../../hooks/useBasinFilter';
import { useAppData } from '../../providers/AppDataProvider';
import { Polygon } from './Polygon';

export const useRenderBasins = () => {
  const { showBasins } = useStationFilters();
  const { basins } = useAppData();
  const { shouldHideBasin } = useBasinFilter();

  const renderBasins = useCallback(() => {
    if (!showBasins) {
      return;
    }
    return basins.map((basin) => {
      const { id, color, path } = basin;
      if (shouldHideBasin(id)) {
        return null;
      }
      return (
        <Polygon
          key={id}
          paths={path.map((point) => ({
            lng: Number.parseFloat(point.lng),
            lat: Number.parseFloat(point.lat),
          }))}
          strokeColor="#666"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor={color}
          fillOpacity={0.2}
        />
      );
    });
  }, [showBasins, basins, shouldHideBasin]);

  return {
    renderBasins,
  };
};
