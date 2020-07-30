import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CitizensListComponent} from './citizens/citizens-list/citizens-list.component';


const routes: Routes = [
  {path: 'citizen', component: CitizensListComponent},
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
