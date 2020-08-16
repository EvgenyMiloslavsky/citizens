import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {allCitizensLoaded} from './citizens.actions';
import {CitizensActions} from './actions-type';
import {concatMap, map} from 'rxjs/operators';
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
        // map(citizens => allCitizensLoaded({citizens}))
        map(citizens => allCitizensLoaded({citizens}))

      )
  );

  constructor(private actions$: Actions, private citizensHttpService: CitizensService) {
  }
}
