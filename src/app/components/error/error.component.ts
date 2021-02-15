import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css', '../registration/registration.component.css']
})
export class ErrorComponent implements OnInit {
  image: string = '/assets/registration/5.png';

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  navigateToHome(){
    this.route.navigateByUrl('/');
  }
}
