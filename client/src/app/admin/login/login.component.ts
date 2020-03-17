import {Component, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() error: string | null;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn) {
      router.navigate(['home']);
    }
    authService.afAuth.authState.subscribe(() => {
      if (authService.isLoggedIn) {
        this.router.navigate(['home']);
      }
    });
  }

  async submit(username: string, password: string) {
    await this.authService.login(username, password).catch(reason => {
      this.error = reason;
      this.router.navigate(['login']);
    });
    await this.router.navigate(['home']);
  }
}
