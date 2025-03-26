import React, { useEffect } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import config from '../../config';
import { useRasters } from '../../hooks/useRasters';
import { useMapPosition } from '../../hooks/useMapPosition';
import { buildMapStyles, extractDefaultId } from './mapStyles';
import { useMapStyle } from '../../hooks/useMapStyle';
import { useRenderStreams } from './useRenderStreams';
import { useRenderBasins } from './useRenderBasins';
import { useRenderHydroMetricStations } from './useRenderHydroMetricStations';
import { useRenderWeatherStations } from './useRenderWeatherStations';

const MapComponent = () => {
  const { center, zoom, updateZoomAndCenter } = useMapPosition();
  useRenderHydroMetricStations();
  useRenderStreams();
  useRenderBasins();
  useRasters();
  useRenderWeatherStations();

  const { updateMapStyles, selectedStyle } = useMapStyle();
  const mapRef = useMap();

  // styles
  useEffect(() => {
    if (!mapRef) {
      return;
    }
    const defaultId = extractDefaultId(mapRef);
    const mapStyles = buildMapStyles();
    mapStyles.forEach(({ id, style }) => mapRef.mapTypes.set(id, style));
    updateMapStyles([
      { id: defaultId, name: 'Natural' },
      ...mapStyles.map((mapStyle) => ({
        name: mapStyle.style.name,
        id: mapStyle.id,
      })),
    ]);
  }, [mapRef, updateMapStyles]);

  useEffect(() => {
    if (!mapRef || !selectedStyle) {
      return;
    }
    mapRef.setMapTypeId(selectedStyle);
  }, [mapRef, selectedStyle]);

  return (
    <Map
      mapId={'hydro-dashboard'}
      style={{
        height: '600px',
        // height: '90%',
        // width: '100px',
        width: '95%',
      }}
      zoom={zoom}
      center={center}
      onCameraChanged={(ev) =>
        updateZoomAndCenter({
          zoom: ev.detail.zoom,
          center: ev.detail.center,
        })
      }
    />
  );
};

export const MapContainer = () => {
  return (
    <APIProvider apiKey={config.maps.key}>
      <MapComponent />
    </APIProvider>
  );
};
