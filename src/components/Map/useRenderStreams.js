import { useEffect } from 'react';
import { useStreamLevel } from '../../hooks/useStreamLevel';
import { useStationFilters } from '../../hooks/useStationFilters';
import { useAppData } from '../../providers/AppDataProvider';
import { useStreamFilter } from '../../hooks/useStreamFilter';
import { useMap } from '@vis.gl/react-google-maps';

export const useRenderStreams = () => {
  const { streams } = useAppData();
  const { showStreams } = useStationFilters();
  const { streamLevelData } = useStreamLevel();
  const { shouldHideStream } = useStreamFilter();

  const mapRef = useMap();
  useEffect(() => {
    if (!mapRef || !showStreams) {
      return;
    }
    const polylines = streams.map(({ streamName, streamPaths }) => {
      if (shouldHideStream(streamName)) {
        return [];
      }
      const found = streamLevelData.find((x) => x.streamName === streamName);
      let streamColor = '#666';
      if (found) {
        const { streamLevel } = found;
        if (streamLevel < 0.5) streamColor = '#31859c';
        if (streamLevel >= 0.5 && streamLevel < 1) streamColor = '#f3d41a';
        if (streamLevel >= 1 && streamLevel < 2) streamColor = '#e36d25';
        if (streamLevel >= 2) streamColor = '#ff0000';
      }
      return streamPaths.map((streamPath) => {
        return new google.maps.Polyline({
          map: mapRef,
          path: streamPath,
          strokeColor: streamColor,
          strokeOpacity: 1,
          strokeWeight: 2,
        });
      });
    });
    return () => {
      polylines.forEach((p) => p.forEach((path) => path.setMap(null)));
    };
  }, [mapRef, showStreams, streams, shouldHideStream, streamLevelData]);

  return {};
};
