import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Citizen} from '../models/citizen.model';
import {Observable, Subject} from 'rxjs';
import {debounce, debounceTime, map, take} from 'rxjs/operators';
import {AbstractControl, ValidationErrors} from '@angular/forms';

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

  isEmailExist(email: AbstractControl): AngularFirestoreCollection<Citizen[]> {
    console.log(email);
    return this.firestore.collection(
      'citizens', ref => ref.where(
        'email', '==', email)
    );
  }

  createCitizen(citizen: Citizen) {
    return this.firestore.collection('citizens').add({...citizen});
  }

  updateCitizen(citizen: Citizen) {
    delete citizen.id;
    return this.firestore.doc('citizens/' + citizen.id).update(citizen);
  }

  deleteCitizens(citizenId: string) {
    return this.firestore.doc('citizens/' + citizenId).delete();
  }
}
