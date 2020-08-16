import {Component, OnInit} from '@angular/core';
import {CitizensService} from '../../services/citizens.service';
import {Citizen} from '../../models/citizen.model';

@Component({
  selector: 'app-citizens',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})
export class CitizensListComponent implements OnInit {
  citizens: Citizen[];

  constructor(private citizensService: CitizensService) {
  }

  ngOnInit(): void {

    this.citizensService.getCitizens().subscribe(
      c => this.citizens = c
    );


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

}
