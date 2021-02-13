import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private _HttpClient: HttpClient,
    private router: Router,
  ) { }

  private baseURL: string = `${environment.api}`

  //get all general tasks
  public allTasks(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}/api/post/todos`)
  }
  
}
