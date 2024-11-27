const MAP_STYLE_SET_SELECTED = 'MAP_STYLE_SET_SELECTED';
const MAP_STYLE_SET_MAP_STYLES = 'MAP_STYLE_SET_MAP_STYLES';

export type MapStyle = {
  id: string;
  name: string;
};
type State = {
  selectedStyle: string;
  mapStyles: MapStyle[];
};
const initialState: State = {
  selectedStyle: '',
  mapStyles: [],
};

type SetSelectedStyleAction = {
  type: typeof MAP_STYLE_SET_SELECTED;
  payload: Pick<State, 'selectedStyle'>;
};
export const setSelectedStyleAction: (
  selectedStyle: string
) => SetSelectedStyleAction = (selectedStyle) => ({
  type: MAP_STYLE_SET_SELECTED,
  payload: { selectedStyle },
});

type SetMapStylesAction = {
  type: typeof MAP_STYLE_SET_MAP_STYLES;
  payload: Pick<State, 'mapStyles'>;
};
export const setMapStylesAction: (
  mapStyles: MapStyle[]
) => SetMapStylesAction = (mapStyles) => ({
  type: MAP_STYLE_SET_MAP_STYLES,
  payload: { mapStyles },
});

type ActionType = SetMapStylesAction | SetSelectedStyleAction;

export const mapStyleReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case MAP_STYLE_SET_SELECTED:
      return { ...state, selectedStyle: action.payload.selectedStyle };
    case MAP_STYLE_SET_MAP_STYLES:
      return { ...state, mapStyles: action.payload.mapStyles };
    default:
      return { ...state };
  }
};
