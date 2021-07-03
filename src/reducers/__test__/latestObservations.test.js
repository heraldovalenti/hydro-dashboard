import {
  levelDimension,
  flowDimension,
  rainDimension,
} from '../../components/StationInfo/stationUtil';
import {
  latestObservationsActions,
  latestObservationsReducer,
} from '../latestObservations';

describe('latest observation reducer and action tests', () => {
  describe('reducer tests', () => {
    const emptyState = {
      [levelDimension]: [],
      [flowDimension]: [],
      [rainDimension]: [],
    };
    it('on initialization is not loading and there are no observations', () => {
      const state = latestObservationsReducer(undefined, {
        type: '',
        payload: '',
      });
      const { loading, latestObservations } = state;
      expect(loading).toBeFalsy();
      expect(latestObservations).toStrictEqual(emptyState);
    });
    it('on request it is loading and no observations', () => {
      const state = latestObservationsReducer(
        undefined,
        latestObservationsActions.latestObservationsRequest(1)
      );
      const { loading, latestObservations } = state;
      expect(loading).toBeTruthy();
      expect(latestObservations).toStrictEqual(emptyState);
    });
    it('on success there are observations in key and finished loading', () => {
      const state1 = latestObservationsReducer(
        undefined,
        latestObservationsActions.latestObservationsRequest(levelDimension)
      );
      const { loading: loading1 } = state1;
      expect(loading1).toBeTruthy();
      const observationsMock = ['observation1', 'observation2'];
      const state2 = latestObservationsReducer(
        undefined,
        latestObservationsActions.latestObservationsSuccess(
          levelDimension,
          observationsMock
        )
      );
      const { loading: loading2, latestObservations } = state2;
      expect(loading2).toBeFalsy();
      expect(latestObservations[levelDimension]).toStrictEqual(
        observationsMock
      );
    });
    it('different keys on success do not override previous keys', () => {
      const observationsMock1 = ['observation1-1', 'observation1-2'];
      const observationsMock2 = ['observation2-1', 'observation2-2'];
      const state1 = latestObservationsReducer(
        undefined,
        latestObservationsActions.latestObservationsSuccess(
          levelDimension,
          observationsMock1
        )
      );
      const { latestObservations: latestObservations1 } = state1;
      expect(latestObservations1[1]).toStrictEqual(observationsMock1);
      const state2 = latestObservationsReducer(
        state1,
        latestObservationsActions.latestObservationsSuccess(
          flowDimension,
          observationsMock2
        )
      );
      const { latestObservations: latestObservations2 } = state2;
      expect(latestObservations2[levelDimension]).toStrictEqual(
        observationsMock1
      );
      expect(latestObservations2[flowDimension]).toStrictEqual(
        observationsMock2
      );
    });
    it('same key on success override previous key', () => {
      const observationsMock1 = ['observation1-1', 'observation1-2'];
      const observationsMock2 = ['observation2-1', 'observation2-2'];
      const state1 = latestObservationsReducer(
        undefined,
        latestObservationsActions.latestObservationsSuccess(
          levelDimension,
          observationsMock1
        )
      );
      const { latestObservations: latestObservations1 } = state1;
      expect(latestObservations1[1]).toStrictEqual(observationsMock1);
      const state2 = latestObservationsReducer(
        state1,
        latestObservationsActions.latestObservationsSuccess(
          levelDimension,
          observationsMock2
        )
      );
      const { latestObservations: latestObservations2 } = state2;
      expect(latestObservations2[1]).toStrictEqual(observationsMock2);
    });
  });
  describe('actions tests', () => {
    it('request action test', () => {
      const action = latestObservationsActions.latestObservationsRequest(1);
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.payload.dimensionId).toBe(1);
    });
    it('success action test', () => {
      const errorMock = { message: 'error-mock' };
      const action = latestObservationsActions.latestObservationsFail(
        errorMock
      );
      expect(action.type).toBeDefined();
      expect(action.payload.error).toStrictEqual(errorMock);
    });
    it('fail action test', () => {
      const observationsMock = ['observation1', 'observation2'];
      const action = latestObservationsActions.latestObservationsSuccess(
        2,
        observationsMock
      );
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.payload.dimensionId).toBe(2);
      expect(action.payload.observations).toStrictEqual(observationsMock);
    });
  });
});
