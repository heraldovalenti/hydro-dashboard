export type Observation = {
  id: number;
  time: string;
  station: Station;
  value: number;
  unit: Unit;
  dimension: Dimension;
  dataOrigin: DataOrigin;
  diff: number | null;
};

export type Station = {
  id: number;
  description: string;
  latitude: number;
  longitude: number;
  stationDataOriginList: StationDataOrigin[];
  active: boolean;
};

export type StationDataOrigin = {
  id: number;
  externalStationId: string;
  dimension: Dimension;
  dataOrigin: DataOrigin;
  defaultUnit: Unit;
};

export type Dimension = {
  id: number;
  description: string;
  preferredUnit: Unit;
};

export type Unit = {
  id: number;
  alias: string;
  description: string;
};

export type DataOrigin = {
  id: number;
  description: string;
};

export type StreamLevel = {
  observation: Observation;
  streamLevel: number;
  streamName: string;
};
