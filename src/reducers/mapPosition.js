const MAP_UPDATE_CENTER = 'MAP_UPDATE_CENTER';
const MAP_UPDATE_ZOOM = 'MAP_UPDATE_ZOOM';
const MAP_UPDATE = 'MAP_UPDATE';

const initialState = {
  zoom: 8,
  center: { lat: -25.6558152, lng: -65.5006693 },
};

export const updateZoomAction = (zoom) => ({
  type: MAP_UPDATE_ZOOM,
  payload: { zoom },
});

export const updateCenterAction = (center) => ({
  type: MAP_UPDATE_CENTER,
  payload: { center },
});

export const updateZoomAndCenterAction = ({ zoom, center }) => ({
  type: MAP_UPDATE,
  payload: { zoom, center },
});

export const mapPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_UPDATE_ZOOM:
      return { ...state, zoom: action.payload.zoom };
    case MAP_UPDATE_CENTER:
      return { ...state, center: action.payload.center };
    case MAP_UPDATE:
      return { zoom: action.payload.zoom, center: action.payload.center };
    default:
      return { ...state };
  }
};
