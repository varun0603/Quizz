import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService) {
  }

  get authService(): AuthService {
    return this._authService;
  }

  ngOnInit(): void {
  }
}
