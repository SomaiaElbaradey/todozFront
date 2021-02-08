import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../registration/registration.component.css']
})
export class LoginComponent implements OnInit {

  //registration validation
  myForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  })

  constructor(private myActivatedRoute: ActivatedRoute, private router:Router) {
    console.log(myActivatedRoute)
  }

  validForm = true;
  image: string = '/assets/registration/5.png';

  ngOnInit(): void {
  }

  login(e) {
    if (this.myForm.valid) {
      //take values to back to register
      this.validForm = true;
    }
    else this.validForm = false;
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
 }

}