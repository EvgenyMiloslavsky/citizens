import {createAction, props} from '@ngrx/store';

export const loadSpinner = createAction(
  '[Spinner Action] Load Spinner',
  props<{ spinner: number }>()
);

export const removeSpinner = createAction(
  '[SpinnerAction] Remove Spinner'
);



