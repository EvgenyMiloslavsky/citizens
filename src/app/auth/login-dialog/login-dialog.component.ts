import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SpinnerService} from '../../services/spinner.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {login} from '../auth.actions';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {Citizen} from '../../models/citizen.model';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  form: FormGroup;
  email: FormControl = new FormControl(
    'test@test.com',
    [Validators.required,
      Validators.email]);
  password: FormControl = new FormControl(
    'test_test',
    [Validators.required,
      Validators.minLength(8)]
  );

  onProgress = false;
  requestError = false;


  // user = new User();
  // onProgress = this.spinnerService.visibility.subscribe(vis=>
  // );

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = new FormGroup({
        email: this.email,
        password: this.password
      }
    );
    this.spinnerService.visibility.subscribe(vis =>
      this.onProgress = vis
    );
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordEmailErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
  }

  onLogin() {
    this.authService.LogIn(this.email.value, this.password.value)
      .pipe(
        tap(user => {
          this.spinnerService.show();

          setTimeout(
            () => {
              this.spinnerService.hide();
              this.store.dispatch(login({user}));
              console.log(`Result ${user.email}`);
              this.router.navigateByUrl('/citizen');
              this.dialogRef.close();
            }, 3000
          );
        })
      ).subscribe(
      noop,
      () => {
        console.log(`Login Failed`);
        this.requestError = true;
      }
    );
  }
}
