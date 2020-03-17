import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }


  get authService(): AuthService {
    return this._authService;
  }
}
