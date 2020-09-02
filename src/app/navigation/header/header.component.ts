import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginDialogComponent} from '../../auth/login-dialog/login-dialog.component';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {isLoggedIn, isLoggedOut} from '../../auth/auth.selectors';
import {logout} from '../../auth/auth.actions';
import {AddDialogComponent} from '../../add-dialog/add-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onToggle = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>) {
  }

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );


    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );


  }

  openLogInDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '200px'
    };
    dialogConfig.height = '265px';
    dialogConfig.width = '350px';

    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

  logout() {
    this.store.dispatch(logout());
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    dialogConfig.position = {
      top: '50px'
    };
    dialogConfig.height = '500px';
    dialogConfig.minWidth = '700px';

    this.dialog.open(AddDialogComponent, dialogConfig);

  }
}
