import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Citizen} from '../models/citizen.model';
import {Observable, Subject} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  // citizens: Observable<Citizen[]>;
  citizsens = new Subject();

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  mediaFolderPath = 'citizens';


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

  uploadPictures(file): FilesUploadMetadata {
    const id = Math.random().toString(36).substring(2);
    const ref = this.storage.ref(`${this.mediaFolderPath}/${id}`);
    const task = ref.put(file.target.files[0]);
    const uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(
        () => this.downloadURL = ref.getDownloadURL()
      )
    ).subscribe();

    return {
      uploadProgress$: uploadProgress,
      downloadUrl$: this.downloadURL
    };
  }

  /*
    uploadPictures(file): Observable<string | null> {
      const id = Math.random().toString(36).substring(2);
      this.ref = this.storage.ref(`citizens/${id}`);
      this.task = this.ref.put(file.target.files[0]);
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(
          () => this.downloadURL = this.ref.getDownloadURL()
        )
      ).subscribe();
      return this.downloadURL;
    }
  */

  updateCitizen(citizen: Citizen) {
    delete citizen.id;
    return this.firestore.doc('citizens/' + citizen.id).update(citizen);
  }

  deleteCitizens(citizenId: string) {
    return this.firestore.doc('citizens/' + citizenId).delete();
  }
}
