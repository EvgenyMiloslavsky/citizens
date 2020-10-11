import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Citizen} from '../models/citizen.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  // citizens: Observable<Citizen[]>;
  citizsens = new Subject();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
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

  uploadPictures(event) {
    console.log(`File>>> ${event}`);
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // console.log(event.target.files[0]);
    // create a reference to the storage bucket location
    this.ref = this.storage.ref(`citizens/${randomId}`);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event);
  }

  updateCitizen(citizen: Citizen) {
    delete citizen.id;
    return this.firestore.doc('citizens/' + citizen.id).update(citizen);
  }

  deleteCitizens(citizenId: string) {
    return this.firestore.doc('citizens/' + citizenId).delete();
  }
}
