import config from '../config';
import { Dimension } from '../model';

export const RAIN_DIMENSION_ID = config.constants.dimensions.rainId;
export const LEVEL_DIMENSION_ID = config.constants.dimensions.levelId;
export const FLOW_DIMENSION_ID = config.constants.dimensions.flowId;

export const isRainDimension = (dimension: Dimension) =>
  dimension.id === RAIN_DIMENSION_ID;
export const isLevelDimension = (dimension: Dimension) =>
  dimension.id === LEVEL_DIMENSION_ID;
export const isFlowDimension = (dimension: Dimension) =>
  dimension.id === FLOW_DIMENSION_ID;
