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
    selectSexControl: new FormControl('', Validators.required)
  });
  requestError = false;
  citizenships = new Observable<string[]>() ;
  selected = 'option1';
  citizenship = '';

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
    /*if (this.citizenships) {
      if (this.citizenships.length < 2) {
        this.citizenships.push(citizenship);
        this.citizenship = '';
      }
    }*/
  }
}
