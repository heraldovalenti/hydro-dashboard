import React from 'react';
import './styles.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import config from '../../config';
import { useMapPosition } from '../../hooks/useMapPosition';
// import { useRenderStreams } from '../../components/Map/useRenderStreams';
// import { useRenderBasins } from '../../components/Map/useRenderBasins';
// import { useRenderHydroMetricStations } from '../../components/Map/useRenderHydrometricStations';
// import { useRenderWeatherStations } from '../../components/Map/useRenderWeatherStations';
import { useRasters } from '../../hooks/useRasters';

export default function Visualizations() {
  return (
    <APIProvider apiKey={config.maps.key}>
      <MapComponent />
    </APIProvider>
  );
}

const MapComponent = () => {
  const { initialCenter, initialZoom, updateZoomAndCenter } = useMapPosition();
  // const { renderStreams } = useRenderStreams();
  // const { renderBasins } = useRenderBasins();
  // const { renderHydroMetricStations } = useRenderHydroMetricStations();
  const { renderRasterV2 } = useRasters();
  // useRenderWeatherStations();

  return (
    <Map
      mapId={'hydro-dashboard'}
      style={{
        height: '600px',
        // height: '90%',
        // width: '100px',
        width: '95%',
      }}
      zoom={initialZoom}
      center={initialCenter}
      onCameraChanged={(ev) =>
        updateZoomAndCenter({
          zoom: ev.detail.zoom,
          center: ev.detail.center,
        })
      }
    >
      {/* {renderStreams()} */}
      {/* {renderBasins()} */}
      {/* {renderHydroMetricStations()} */}
      {renderRasterV2()}
    </Map>
  );
};
