import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../modules/shared.module';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './reducers';
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';


@NgModule({
  declarations: [
    LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    RouterModule.forChild([{path: '', component: LoginComponent}]),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders <AuthModule>{
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}
