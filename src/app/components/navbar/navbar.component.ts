import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logout: string = '/assets/icons/logout.png';

  constructor(
    private RegisterService: RegisterService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    if (confirm(`Are you sure you want to Logout from Todoz?`)) {
      this.RegisterService.logout();
    }
  }
}
