import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Citizen} from '../citizens/citizen.model.ts';

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  constructor(private firestore: AngularFirestore) { }

  getCitizens() {
    return this.firestore.collection('citizens').snapshotChanges();
  }

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
