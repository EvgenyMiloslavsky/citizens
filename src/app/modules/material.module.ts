import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AuthService} from '../auth/auth.service';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';

const dialogMock = {
  close: () => { }
};

@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: dialogMock    },
    AuthService
  ]
})
export class MaterialModule {
}
