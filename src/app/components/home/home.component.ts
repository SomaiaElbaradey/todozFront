import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../registration/registration.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  edit: string = '/assets/icons/edit.png'
  ngOnInit(): void {
  }

}
