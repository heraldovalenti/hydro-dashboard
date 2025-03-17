import React from 'react';
// import { MapComponent } from '../../components/Map';
import './styles.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import config from '../../config';
import { useMapPosition } from '../../hooks/useMapPosition';
import { useRenderStreams } from '../../components/Map/useRenderStreams';
import { useRenderBasins } from '../../components/Map/useRenderBasins';
import { useRenderHydroMetricStations } from '../../components/Map/useRenderHydrometricStations';

export default function Visualizations() {
  const { initialCenter, initialZoom } = useMapPosition();

  // return (
  //   <div className="visualizations">
  //     <MapComponent />
  //   </div>
  // );

  const { renderStreams } = useRenderStreams();
  const { renderBasins } = useRenderBasins();
  const { renderHydroMetricStations } = useRenderHydroMetricStations();

  return (
    <APIProvider
      apiKey={config.maps.key}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <Map
        mapId={'hydro-dashboard'}
        style={{
          height: '600px',
          // height: '90%',
          // width: '100px',
          width: '95%',
        }}
        defaultZoom={initialZoom}
        defaultCenter={initialCenter}
        // onCameraChanged={(ev) =>
        //   console.log(
        //     'camera changed:',
        //     ev.detail.center,
        //     'zoom:',
        //     ev.detail.zoom
        //   )
        // }

        // center={initialCenter}
        // zoom={initialZoom}
      >
        {renderStreams()}
        {renderBasins()}
        {renderHydroMetricStations()}
      </Map>
    </APIProvider>
  );
}
