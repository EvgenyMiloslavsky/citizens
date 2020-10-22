import {NgModule} from '@angular/core';
import {SharedModule} from '../modules/shared.module';
import {CitizensListComponent} from './citizens-list/citizens-list.component';
import {CitizensResolver} from './citizens.resolver';
import {EffectsModule} from '@ngrx/effects';
import {CitizensEffects} from './citizens.effects';
import {StoreModule} from '@ngrx/store';
import {citizensReducer} from './reducers/citizen.reducers';
import {CitizensRoutingModule} from './citizens-routing.module';
import * as fromSpinner from './reducers/spinner.reducer';


/*
export const citizenRoutes: Routes = [
  {
    path: '',
    component: CitizensListComponent,
    resolve: {
      citizen: CitizensResolver
    }
  }
];
*/


@NgModule({
  declarations: [CitizensListComponent],
  imports: [
    SharedModule,
    // RouterModule.forChild([{path: '', component: CitizensListComponent}])
    // RouterModule.forChild(citizenRoutes),
    EffectsModule.forFeature([CitizensEffects]),
    StoreModule.forFeature('citizens', citizensReducer),
    CitizensRoutingModule,
    StoreModule.forFeature(fromSpinner.spinnerFeatureKey, fromSpinner.reducer),
  ],
  providers: [
    CitizensResolver
  ]
})
export class CitizensModule {
}
