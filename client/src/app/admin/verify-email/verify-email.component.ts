import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  user: User;

  constructor(public authService: AuthService) {
    authService.user$.subscribe(us => this.user = us);
  }

  ngOnInit(): void {
  }
}
