import {Citizen} from '../../models/citizen.model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CitizensActions} from '../actions-type';

export interface CitizensState extends EntityState<Citizen> {

}

export const adapter = createEntityAdapter<Citizen>();


export const initialCitizensState = adapter.getInitialState();

export const citizensReducer = createReducer(
  initialCitizensState,
  on(CitizensActions.allCitizensLoaded,
    (state, action) =>
      adapter.addMany(action.citizens, state)
  )
);

export const {selectAll} = adapter.getSelectors();
