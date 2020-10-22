import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {allCitizensLoaded} from './citizens.actions';
import {CitizensActions} from './actions-type';
import {concatMap, map, mergeMap} from 'rxjs/operators';
import {CitizensService} from '../services/citizens.service';

@Injectable()
export class CitizensEffects {

  loadCitizens$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CitizensActions.loadAllCitizens),
        concatMap(
          action => this.citizensHttpService.getCitizens()
        ),
        map(citizens => allCitizensLoaded({citizens}))
      )
  );

  deleteCitizen$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CitizensActions.deleteCitizen),
        concatMap(
          action => this.citizensHttpService.deleteCitizens(action.id))
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private citizensHttpService: CitizensService
  ) {
  }
}
