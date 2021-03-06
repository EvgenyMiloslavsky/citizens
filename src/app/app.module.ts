import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavComponent} from './navigation/sidenav/sidenav.component';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './modules/shared.module';
import {LoginDialogComponent} from './auth/login-dialog/login-dialog.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import {metaReducers, reducers} from './reducers';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {AddDialogComponent} from './add-dialog/add-dialog.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import * as fromSpiner from './citizens/reducers/spinner.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    LoginDialogComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlexLayoutModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ReactiveFormsModule,
    AuthModule.forRoot(),
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    FormsModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
