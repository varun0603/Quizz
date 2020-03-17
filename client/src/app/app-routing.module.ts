import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {RegisterComponent} from './admin/register/register.component';
import {VerifyEmailComponent} from './admin/verify-email/verify-email.component';
import {ForgotPasswordComponent} from './admin/forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {SecureInnerPagesGuard} from './guard/secure-inner-pages.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
