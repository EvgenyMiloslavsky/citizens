import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Citizen} from '../models/citizen.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  // citizens: Observable<Citizen[]>;
  citizsens = new Subject();

  constructor(private firestore: AngularFirestore) {
  }

  /*
    getCitizens(): Observable<any> {
      return this.firestore.collection('citizens').snapshotChanges();
    }
  */
  getCitizens(): Observable<Citizen[]> {
    return this.firestore.collection('citizens').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Citizen;
            const id = a.payload.doc.id;
            return {id, ...data};
          })
        )
      );
  }


  /*.subscribe(data => {
    data.map(c => {
      return {
        id: c.payload.doc.id,
        ...c.payload.doc.data() as {}
      } as Citizen;
    });
  });
*/

  createCitizen(citizen: Citizen) {
    return this.firestore.collection('citizens').add(citizen);
  }

  updateCitizen(citizen: Citizen) {
    delete citizen.id;
    return this.firestore.doc('citizens/' + citizen.id).update(citizen);
  }

  deleteCitizens(citizenId: string) {
    return this.firestore.doc('citizens/' + citizenId).delete();
  }
}
