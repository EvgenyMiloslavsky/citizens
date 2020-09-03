import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(
      '', [Validators.required]),
    surname: new FormControl(
      '', [Validators.required]),
    email: new FormControl(
      '', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(
      '', [Validators.required]),
    marriage: new FormControl(
      '', [Validators.required]),
    phoneNum: new FormControl(
      '', [Validators.required]),
    criminal: new FormControl(
      '', [Validators.required]),
    citizenship: new FormControl(
      '', [Validators.required]),
    gender: new FormControl(
      '', [Validators.required])
  });
  requestError = false;
  // citizenships = new Observable<string[]>();
  citizenships: string[] = [];
  selected = 'option1';
  citizenship = '';
  citizenshipAddState = false;
  gender: string;

  constructor(private dialogRef: MatDialogRef<AddDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick() {

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
}
