import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn) {
      router.navigate(['home']);
    }
    authService.authState.subscribe(
      () => {
        if (authService.isLoggedIn) {
          this.router.navigate(['home']);
        }
      });
  }

  ngOnInit(): void {
  }

  async signup(username: string, password: string, displayname: string) {
    await this.authService.register(username, password, displayname);
    await this.router.navigate(['/verify-email']);
  }
}
