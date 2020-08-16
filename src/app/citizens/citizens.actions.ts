import {createAction, props} from '@ngrx/store';
import {Citizen} from '../models/citizen.model';

export const loadAllCitizens = createAction(
  '[Citizens Resolver] Load All Citizens'
);

export const allCitizensLoaded = createAction(
  '[Load citizens Effect] All Courses Loaded',
  props<{citizens: Citizen[]}>()
);
