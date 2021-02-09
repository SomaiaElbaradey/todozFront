import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private _registerService: RegisterService
  ) { }

  //registration validation
  myForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(64),
      Validators.minLength(7),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    age: new FormControl(null, [
      ageValidator
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$')
    ]),
    name: new FormControl('', [
      Validators.maxLength(17),
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z ]*')
    ])
  })

  //initiale values
  validForm = true;
  image: string = '/assets/registration/5.png'

  ngOnInit(): void {
  }

  registration(e) {
    if (this.myForm.valid) {
      //request to register with the valid data
      this._registerService.register(
        e.email.value,
        e.password.value,
        e.name.value,
        e.age.value,
        e.username.value
      )
        .subscribe(
          (response) => {
            console.log(response)
          },
          (err) => {
            console.log(err)
          }
        );
      this.validForm = true;
    }
    else this.validForm = false;
  }

  //navigate to login
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

}

//custom validation
function ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const age: number = control.value;
  if (age && (age < 13 || isNaN(age))) return { 'ageValidator': true }
  if (age == null) return null
  return null
}
