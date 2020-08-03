import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../modules/shared.module';
import {RouterModule} from '@angular/router';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './reducers';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';


@NgModule({
  declarations: [
    LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    RouterModule.forChild([{path: '', component: LoginComponent}])
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
