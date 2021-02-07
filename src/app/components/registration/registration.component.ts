import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  image: string = '/assets/registration/5.png'
  registered: boolean = false;
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
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    name: new FormControl('', [
      Validators.maxLength(17),
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z ]*')
    ])
  })

  validForm = true;
  list = [{ name: "Somaia", age: 23, email: "SomaiaMostafa@angular.com" }];
  metaData = ["Name", "Age", "Email"];

  constructor() { }

  ngOnInit(): void {
  }

  allowRegister() {
    this.registered = true;
  }

  @Output('lastPerson') myEvent = new EventEmitter();

  registration(e) {
    console.log(e)
    console.log(this.myForm)
    if (this.myForm.valid) {
      this.myEvent.emit(this.myForm.value);
      this.validForm = true;
      this.list.push(this.myForm.value);
    }
    else this.validForm = false;
  }
}

function ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const age: number = control.value;
  if (age && (age < 13 || isNaN(age))) return { 'ageValidator': true }
  if (age == null) return null
  return null
}
