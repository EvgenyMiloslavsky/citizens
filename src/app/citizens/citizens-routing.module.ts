import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CitizensListComponent} from './citizens-list/citizens-list.component';
import {CitizensResolver} from './citizens.resolver';

const routes: Routes = [
  {
    path: '',
    component: CitizensListComponent,
    resolve: {
      citizen: CitizensResolver
    },
    children: [
      {path: 'criminal'},
      {path: 'citizenship'},
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)

export class CitizensRoutingModule {
}
