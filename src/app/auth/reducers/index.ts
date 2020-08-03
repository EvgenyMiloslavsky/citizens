import {createReducer, on} from '@ngrx/store';
import {User} from '../../models/user.model';
import {AuthActions} from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    };
  })
);
