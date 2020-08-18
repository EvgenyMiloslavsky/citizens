import {Component, OnInit} from '@angular/core';
import {CitizensService} from '../../services/citizens.service';
import {Citizen} from '../../models/citizen.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {selectAllCitizens, selectCitizensWithCriminalRecords, selectCitizensWithDoubleCitizenship} from '../sitizens.selector';

@Component({
  selector: 'app-citizens',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})
export class CitizensListComponent implements OnInit {
  // citizens$: Citizen[];
  citizens$: Observable<Citizen[]>;
  citizensWithDoubleCitizenship$: Observable<Citizen[]>;
  citizensWithCriminalRecords$: Observable<Citizen[]>;

  constructor(
    private citizensService: CitizensService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.citizens$ = this.store.pipe(select(selectAllCitizens));
    this.citizensWithDoubleCitizenship$ = this.store.pipe(select(selectCitizensWithDoubleCitizenship));
    this.citizensWithCriminalRecords$ = this.store.pipe(select(selectCitizensWithCriminalRecords));
  }

  /*
      this.citizensService.getCitizens().subscribe(
        c => this.citizens = c
      );
  */


  /*
          this.citizensService.getCitizens().subscribe(
            data => {
              console.log(data);
              this.citizens = data.map(c => {
                  return {
                    id: c.payload.doc.id,
                    ...c.payload.doc.data() as {}
                  } as Citizen;
                }
              );
            }
          );
  */


}
