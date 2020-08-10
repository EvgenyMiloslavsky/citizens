import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {isLoggedIn} from './auth.selectors';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('Auth guard', loggedIn);
            this.router.navigateByUrl('/login');
            return false;
          } else {
            return true;
          }
        })
      );
  }

}
