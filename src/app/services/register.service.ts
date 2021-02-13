import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _HttpClient: HttpClient,
    private router: Router,
    private _CookieService: CookieService,
    ) { }
  redirectUrl = "/home";
  private baseURL: string = `${environment.api}`

  public register(mail: string, password: string, firstName: string, age, userName): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}/api/user/register`,
        { mail, password, age, userName, firstName },
        {observe:'response'}
      ).pipe(
        map((response) => {
          if (response) {
            console.clear();
            this.router.navigateByUrl('/home');
          }
        })
      )
  }

  public login(mail: string, password: string): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}/api/user/login`,
        { mail, password },
        { responseType: "text" }
      ).pipe(
        map((response) => {
          if (response) {
            this._CookieService.set("Token", response);
            console.clear();
            this.router.navigateByUrl('/home');
          }
        })
      )
  }

  public logout() {
    this._CookieService.delete("Token");
  }

}