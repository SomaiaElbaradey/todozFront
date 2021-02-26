import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BottonComponent } from './components/botton/botton.component';
import { GroupComponent } from './components/group/group.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  declarations: [
    AppComponent,
    BottonComponent,
    GroupComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    DpDatePickerModule 
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }