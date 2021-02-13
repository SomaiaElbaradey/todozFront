import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoGroupService {

  constructor(
    private _HttpClient: HttpClient,
    private router: Router,
  ) { }

  private baseURL: string = `${environment.api}`

  //get all tasks for group
  public allTasks(id: string): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}/api/todo/todosGroup/${id}`)
  }

  //get last month tasks
  public lastMonTasks(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}/api/todo/lastTodos`)
  }

    //get last month tasks
    public allGroups(): Observable<any> {
      return this._HttpClient
        .get(`${this.baseURL}/api/todo/todosGroup`)
    }
  
}
