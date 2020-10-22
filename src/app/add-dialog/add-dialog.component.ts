import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormArray, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, debounceTime, map, take, takeUntil, tap} from 'rxjs/operators';
import {CitizensService} from '../services/citizens.service';
import {Citizen} from '../models/citizen.model';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  requestError = false;
  selected = 'option1';
  citizenship = '';
  // citizenshipAddState = false;
  gender: string;
  minDate: Date;
  maxDate: Date;
  submitted = false;

  fileName: any;
  file: any;
  uploadProgress$: Observable<number>;
  destroy$: Subject<null> = new Subject();


  multiple = false;
  color: 'primary';
  accept: '.png, .jpg, .jepg';

  addForm = this.fb.group({
      name: ['Geo', Validators.required],
      surname: ['Mil', Validators.required],
      email: ['', [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.email],
        this.validateEmailViaServer.bind(this)
      ],

      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      marriage: ['', Validators.required],
      phoneNum: ['555555555', Validators.required],
      criminalRecords: ['', Validators.maxLength(50)],
      citizenships: new FormArray([
        new FormControl('USA', Validators.required)
      ]),
      photo: ['']
    }
  );


  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    private service: CitizensService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth + 1, currentDay + 1);
    console.log(this.maxDate);
  }


  ngOnInit(): void {
  }

  get f() {
    return this.addForm.controls;
  }

  get surname() {
    return this.addForm.get('surname');
  }

  get name() {
    return this.addForm.get('name');
  }

  get email() {
    return this.addForm.get('email');
  }

  get dateOfBirth() {
    return this.addForm.get('dateOfBirth');
  }

  get citzenships(): FormArray {
    return this.addForm.get('citizenships') as FormArray;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('email')) {
      return 'You must enter email';
    }
    if (this.email.hasError('emailAvailable')) {
      return 'This email already exists ';
    }
    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  /*
    addCitizenship(citizenship: string) {
      console.log('Add Button', citizenship);
      if (this.citizenship) {
        this.citizenships.push(citizenship);
        if (this.citizenships.length == 3) {
          this.citizenshipAddState = true;
        }
      }
      this.citizenship = '';
    }
  */

  addCitizenships() {
    if (this.citzenships.length < 3) {
      this.citzenships.push(new FormControl('', Validators.required));
    }
  }

  removeCitizenship(i: number) {
    this.citzenships.removeAt(i);
  }

  validateEmailViaServer({value}: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.isEmailExist(value)
      .valueChanges()
      .pipe(
        debounceTime(500),
        take(1),
        map(arr => {
            console.log(arr);
            return arr.length ? {emailAvailable: true} : null;
          }
        )
      );
  }

  validateCitizenship(value: AbstractControl) {
    return this.citzenships.length ? null : {citizenshipsAvailable: false};
  }

  onSubmit() {

    // this.addForm.markAllAsTouched();

    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    } else {
      const newCitizen = new Citizen(
        this.addForm.value
      );
      newCitizen.dateOfBirth = this.datePipe.transform(newCitizen.dateOfBirth, 'dd/MM/yyyy');
      /*this.service.uploadPictures(this.file)
        .subscribe(
          (url) => {
            newCitizen.photo = url;
            this.service.createCitizen(newCitizen)
              .then(r => console.log(r));
            console.log('Submit >>>>>>>');
            this.dialogRef.close();

          })      ;
*/
      const {downloadUrl$, uploadProgress$} = this.service.uploadPictures(
        this.file
      );

      this.uploadProgress$ = uploadProgress$;

      downloadUrl$
        .pipe(
          tap(),
          takeUntil(this.destroy$),
          catchError((error) => {
            this.snackBar.open(`${error.message} 😢`, 'Close', {
              duration: 4000,
            });
            return EMPTY;
          }),
        )
        .subscribe((downloadUrl) => {
          newCitizen.photo = downloadUrl;
          this.service.createCitizen(newCitizen)
            .then(r => {
              console.log(r);
              this.dialogRef.close();
            });
          console.log('Submit >>>>>>>');
        });

    }
  }

  close() {
    this.dialogRef.close();
  }

  fileChangeEvent(event) {
    this.file = event;
    /*
        this.file = (event.target as HTMLInputElement).files[0];
        this.fileName = event.target.files[0].name;
        console.log(`Event file name ${this.fileName}`);
    */
  }

  /*
    onDestroy() {

    }
  */
}


