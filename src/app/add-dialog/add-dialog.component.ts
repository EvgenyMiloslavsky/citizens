import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormArray, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, take} from 'rxjs/operators';
import {CitizensService} from '../services/citizens.service';
import {Citizen} from '../models/citizen.model';
import {DatePipe} from '@angular/common';

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

  multiple = false;
  color: 'primary';
  accept: '.png, .jpg, .jepg';

  addForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.email],
        this.validateEmailViaServer.bind(this)
      ],

      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      marriage: ['', Validators.required],
      phoneNum: ['', Validators.required],
      criminal: ['', Validators.maxLength(50)],
      citizenships: new FormArray([
        new FormControl('', Validators.required)
      ]),
    },
  );


  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    private service: CitizensService,
    private datePipe: DatePipe
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
      // newCitizen.citizenShip = this.citizenships;
      this.service.createCitizen(newCitizen)
        .then(r => console.log(r));
      console.log('Submit >>>>>>>');
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}

