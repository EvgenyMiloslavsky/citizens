import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    MatNativeDateModule
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule {
}
