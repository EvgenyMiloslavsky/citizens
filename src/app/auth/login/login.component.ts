import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent implements OnInit {
  loading: true;

  constructor(public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
    this.openDialog();
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '200px'
    };
    dialogConfig.height = '265px';
    dialogConfig.width = '350px';

    // this.dialog.open(LoginDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig, );

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
