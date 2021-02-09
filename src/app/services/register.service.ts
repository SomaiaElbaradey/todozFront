import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _HttpClient: HttpClient) { }
  private baseURL: string = `${environment.api}`

  public register(mail: string, password: string, firstName: string, age, userName): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}/api/user/register`,
        { mail, password, age, userName, firstName },
        {observe:'response'}
      )
  }

  public login(mail: string, password: string): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}/api/user/login`,
        { mail, password },
        {observe:'response'}
      )
  }
}
