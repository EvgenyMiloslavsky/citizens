import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'citizens',
    loadChildren: () => import('./citizens/citizens.module').then(m => m.CitizensModule),
    canActivate: [AuthGuard], canActivateChild: [AuthGuard],
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
