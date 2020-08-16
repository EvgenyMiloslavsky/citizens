import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
// import {User} from '../models/user.model';
import {Observable} from 'rxjs';
// import {Citizen} from '../models/citizen.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private afAuth: AngularFireAuth,
    // public dialogRef: MatDialogRef<LoginDialogComponent>,
    private http: HttpClient
  ) {
  }

  /* LogIn(email: string, password: string){
     return this.afAuth.signInWithEmailAndPassword(email, password);
   }
 */


  LogIn(email: string, password: string): Observable<any> {

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      `{"email":"${email}","password":"${password}","returnSecureToken":true}`,
      {headers: this.headers,},
    );
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
