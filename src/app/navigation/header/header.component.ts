import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginDialogComponent} from '../../auth/login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onToggle = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openLogInDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '200px'
    };
    dialogConfig.height = '265px';
    dialogConfig.width = '350px';

    this.dialog.open(LoginDialogComponent, dialogConfig);
  }
}
