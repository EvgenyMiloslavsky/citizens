import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CitizensListComponent} from './citizens/citizens-list/citizens-list.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {
    path: 'citizen',
    loadChildren: () => import('./citizens/citizens.module').then(m => m.CitizensModule),
    canActivate: [AuthGuard]
  },
/*
  {
    path: 'login',
    component: LoginComponent
/!*    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)*!/
  },
*/
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
