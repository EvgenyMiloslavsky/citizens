import {Inject, Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {SpinnerService} from '../services/spinner.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {timeInterval} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private spinnerService: SpinnerService,
    private ngZone: NgZone,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
  }

  LogIn(email: string, password: string): Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
/*
  LogIn(email: string, password: string) {
    this.spinnerService.show();
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      result => {
        setTimeout(() => {
            this.spinnerService.hide();
            this.router.navigate(['s']);
            this.ngZone.run(() => {
              this.dialogRef.close();

            });

          }
          , 5000
        );
        /!*
*!/
        // this.dialogRef.close();
        console.log(`Result ${result}`);
      }
    ).catch(err => {
      this.spinnerService.hide();
      console.log(`Auth Error ${err}`);
    });
    return true;

  }
*/
}
