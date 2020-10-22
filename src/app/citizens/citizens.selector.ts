import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCitizens from './reducers/citizen.reducers';
import {CitizensState} from './reducers/citizen.reducers';

export const selectCitizensState = createFeatureSelector<CitizensState>('citizens');

export const selectAllCitizens = createSelector(
  selectCitizensState,
  fromCitizens.selectAll
);

export const selectCitizensWithDoubleCitizenship = createSelector(
  selectAllCitizens,
  citizens => citizens.filter(citizen => citizen.citizenShip.length > 1)
);

export const selectCitizensWithCriminalRecords = createSelector(
  selectAllCitizens,
  citizens => citizens.filter(citizen => citizen.criminalRecords != null)
);

