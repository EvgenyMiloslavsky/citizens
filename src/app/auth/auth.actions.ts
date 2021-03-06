import {createAction, props} from '@ngrx/store';
import {User} from '../models/user.model';

export const login = createAction(
  '[Login Action] User Login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Header Menu] Logout'
);
