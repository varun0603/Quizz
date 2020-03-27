import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {User} from './models/user';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }


  get authService(): AuthService {
    return this._authService;
  }
}
