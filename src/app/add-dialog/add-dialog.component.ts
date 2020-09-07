import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {CitizensService} from '../services/citizens.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  form: FormGroup;
  /*name = new FormControl(
    '', [Validators.required]);
  surname = new FormControl(
    '', [Validators.required]);
  email = new FormControl(
    '', [Validators.required, Validators.email]);
  dateOfBirth = new FormControl(
    '', [Validators.required]);
  marriage = new FormControl(
    '', [Validators.required]);
  phoneNum = new FormControl(
    '', [Validators.required]);
  criminal = new FormControl(
    '');
  citizenship = new FormControl(
    '', [Validators.required]);
  gender = new FormControl(
    '', [Validators.required]);*/

  /*  form: FormGroup = new FormGroup({
      name: new FormControl(
        '', [Validators.required]),
      surname: new FormControl(
        '', [Validators.required]),
      email: new FormControl(
        '', [Validators.required, Validators.email], this.validateNameViaServer.bind(this)),
      dateOfBirth: new FormControl(
        '', [Validators.required]),
      marriage: new FormControl(
        '', [Validators.required]),
      phoneNum: new FormControl(
        '', [Validators.required]),
      criminal: new FormControl(
        ''),
      citizenship: new FormControl(
        '', [Validators.required]),
      gender: new FormControl(
        '', [Validators.required])
    });*/
  requestError = false;
  citizenships: string[] = [];
  selected = 'option1';
  citizenship = '';
  citizenshipAddState = false;
  gender: string;


  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    private service: CitizensService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: new FormControl(
          'George', [Validators.required]),
        surname: new FormControl(
          'Mil', [Validators.required]),
        email: new FormControl(
          '', [Validators.required, Validators.email], this.validateEmailViaServer.bind(this)),
        dateOfBirth: new FormControl(
          '', [Validators.required]),
        marriage: new FormControl(
          '', [Validators.required]),
        phoneNum: new FormControl(
          '', [Validators.required]),
        criminal: new FormControl(
          ''),
        citizenship: new FormControl(
          'USA', this.validateCitizenship.bind(this)),
        gender: new FormControl(
          '', [Validators.required])
      });
  }


  close() {
    this.dialogRef.close();
  }

  save() {

  }

  addCitizenship(citizenship: string) {
    console.log('Add Button', citizenship);
    if (this.citizenship) {
      this.citizenships.push(citizenship);
      if (this.citizenships.length == 2) {
        this.citizenshipAddState = true;
      }
    }
    this.citizenship = '';
  }

  get f() {
    return this.form.controls;
  }


  validateEmailViaServer({value}: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.isEmailExist(value);
  }

  validateCitizenship(value: AbstractControl) {
    return this.citizenships.length ? null : {citizenshipsAvailable: false};
  }


}

