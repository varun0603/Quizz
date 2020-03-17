import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn) {
      router.navigate(['/']);
    }
    authService.afAuth.authState.subscribe(() => {
      if (authService.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

  async reset(email: string) {
    await this.authService.sendPasswordResetEmail(email);
    await this.router.navigate(['/login']);
  }
}
