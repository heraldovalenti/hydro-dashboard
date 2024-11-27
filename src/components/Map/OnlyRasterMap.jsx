import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../../config';
import './styles.css';
import { useRasters } from '../../hooks/useRasters';
import { useMapPosition } from '../../hooks/useMapPosition';
import { useRasterContext } from '../../providers/RastersProvider';

const OnlyRasterMap = ({ google }) => {
  const { renderRasterV2, opacity } = useRasters();
  const { setShowRaster, setSelectedRaster, rastersData } = useRasterContext();
  useEffect(() => {
    setShowRaster(true);
    setSelectedRaster(rastersData[0]);
  }, [rastersData, setSelectedRaster, setShowRaster]);
  const { mapPosition, initialZoom, initialCenter } = useMapPosition();
  return (
    <div>
      <h1>ONLY RASTER MAP {opacity}</h1>
      <Map
        onZoomChanged={(_mapProps, map) => {
          mapPosition.zoom = map.zoom;
        }}
        onDragend={(_mapProps, map) => {
          mapPosition.center.lat = map.center.lat();
          mapPosition.center.lng = map.center.lng();
        }}
        google={google}
        zoom={initialZoom}
        containerStyle={{
          width: '95%',
          height: '90%',
        }}
        initialCenter={initialCenter}
      >
        {renderRasterV2()}
      </Map>
    </div>
  );
};

const MapComponent = GoogleApiWrapper({
  apiKey: config.maps.key,
  libraries: ['places', 'visualization'],
})(OnlyRasterMap);

export { MapComponent as OnlyRasterMap };
