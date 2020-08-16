import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {finalize, first, tap} from 'rxjs/operators';
import {loadAllCitizens} from './citizens.actions';

@Injectable()
export class CitizensResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        tap(() => {
            if (!this.loading) {
              this.loading = true;
              this.store.dispatch(loadAllCitizens());
            }
          }
        ),
        first(),
        finalize(
          () => this.loading = false
        )
      )
      ;
  }
}
