import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../registration/registration.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private myActivatedRoute: ActivatedRoute,
    private router: Router,
    private _loginService: RegisterService
  ) {
    console.log(this.myActivatedRoute)
  }

  //login vlaues validation
  myForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  })

  //inital values
  validForm = true;
  image: string = '/assets/registration/5.png';
  error = null;

  ngOnInit(): void {
  }

  login(e) {
    if (this.myForm.valid) {
      //http request to login
      this._loginService.login(
        e.email.value,
        e.password.value,
      )
        .subscribe(
          (response) => {
            console.log(response);
            this.error = null;
          },
          (err) => {
            console.log(err);
            this.error = err.error;
          }
        );
      this.validForm = true;
    }
    else this.validForm = false;
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

}