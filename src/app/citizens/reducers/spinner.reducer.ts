import {createReducer, on} from '@ngrx/store';
import {SpinnerAction} from '../actions-type';


export const spinnerFeatureKey = 'spinner';

export interface SpinnerState {
  spinner: number;
}

export const initialSpinnerState = {
  spinner: undefined
};


export const reducer = createReducer(
  initialSpinnerState,
  on(SpinnerAction.loadSpinner, (state, action) => {
      return {
        spinner: action.spinner
      };
    }
  ),
  on(
    SpinnerAction.removeSpinner, (state, action) => {
      return {
        spinner: undefined
      };
    }
  )
);

