import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {SpinnerService} from '../../services/spinner.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {login} from '../auth.actions';
import {User} from 'firebase';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  form: FormGroup;
  email: FormControl = new FormControl(
    '',
    [Validators.required,
      Validators.email]);
  password: FormControl = new FormControl(
    '',
    [Validators.required,
      Validators.minLength(8)]
  );

  onProgress = false;
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
    this.authService.LogIn(this.email.value, this.password.value).then(
      result => {
        this.spinnerService.show();
        this.store.dispatch( login({})
        );

        setTimeout(
          () => {
            this.spinnerService.hide();
            console.log(`Result ${result.user.uid}`);
            this.router.navigateByUrl('/citizen');
            this.dialogRef.close();
          },
          5000
        );
      }
    ).catch(err => {
      this.spinnerService.hide();
      console.log(`Auth Error ${err}`);
    });
  }
}
