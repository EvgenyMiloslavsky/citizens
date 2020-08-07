import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {login} from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'new-citizens';

  constructor(private store: Store) {
  }

  ngOnInit() {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.store.dispatch(login({user: JSON.parse(userProfile)}));
    }

  }
}
