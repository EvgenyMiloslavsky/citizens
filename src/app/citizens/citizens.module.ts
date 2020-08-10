import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../modules/shared.module';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {CitizensListComponent} from './citizens-list/citizens-list.component';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: CitizensListComponent}])
  ]
})
export class CitizensModule { }
