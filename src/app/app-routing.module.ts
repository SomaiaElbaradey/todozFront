import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from './services/auth.guard';
import { LogginAuthGuardService } from './services/loggin-auth-guard.service';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent, canActivate: [LogginAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LogginAuthGuardService] },
  { path: 'resetPassword', component: ResetpasswordComponent, canActivate: [LogginAuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }