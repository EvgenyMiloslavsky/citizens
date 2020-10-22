import {Component, OnInit} from '@angular/core';
import {CitizensService} from '../../services/citizens.service';
import {Citizen} from '../../models/citizen.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {selectAllCitizens, selectCitizensWithCriminalRecords, selectCitizensWithDoubleCitizenship} from '../citizens.selector';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {CitizensActions} from '../actions-type';

@Component({
  selector: 'app-citizens',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})

export class CitizensListComponent implements OnInit {
  citizens$: Observable<Citizen[]>;
  allCitizens$: Observable<Citizen[]>;
  citizensWithDoubleCitizenship$: Observable<Citizen[]>;
  citizensWithCriminalRecords$: Observable<Citizen[]>;
  url$: Observable<NavigationEnd>;
  clickButton: boolean;

  constructor(
    private citizensService: CitizensService,
    private store: Store<AppState>,
    private router: Router) {
    this.url$ = this.router.events
      .pipe(filter(
        event => event instanceof NavigationEnd
      )) as Observable<NavigationEnd>;
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.citizens$ = this.store.pipe(select(selectAllCitizens));
    this.allCitizens$ = this.store.pipe(select(selectAllCitizens));
    this.citizensWithDoubleCitizenship$ = this.store.pipe(select(selectCitizensWithDoubleCitizenship));
    this.citizensWithCriminalRecords$ = this.store.pipe(select(selectCitizensWithCriminalRecords));

    this.url$.subscribe(ev => {
      console.log('Navigation End!', ev.url);
      console.log('URL >>>>>', ev.url);
      const currentUrl = ev.toString();

      if (currentUrl.includes('criminal')) {
        console.log('Criminal >>>>>');
        this.citizens$ = this.citizensWithCriminalRecords$;
      } else if (currentUrl.includes('citizenship')) {
        console.log('Citizenship >>>>>');
        this.citizens$ = this.citizensWithDoubleCitizenship$;
      } else {
        this.citizens$ = this.allCitizens$;
      }
    });
  }

  onClick() {

  }

  deleteItem(id: string) {
    // this.clickButton = true;
    this.store.dispatch(CitizensActions.deleteCitizen({id}));
    /*
        this.citizensService.deleteCitizens(id);
    */
  }
}
