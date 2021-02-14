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

  private baseURL: string = `${environment.api}/api/todo/`

  //get all tasks for group
  public allTasks(id: string): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}todosGroup/${id}`)
  }

  //get last month tasks
  public lastMonTasks(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}lastTodos`)
  }

  //get all groups
  public allGroups(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}todosGroup`)
  }

  //filter todos for user specified month
  public specificMonthTasks(month): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}lastTodos/${month}`)
  }

   //delete one's group
   public deleteGroup(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}todosGroup/${id}`)
  }

  public addGroup(groupTitle: string): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}todosGroup`,
        { groupTitle },
        { responseType: "text" }
      )
  }

  public updateGroup(groupTitle: string, id: string): Observable<any> {
    return this._HttpClient
      .patch(
        `${this.baseURL}todosGroup/${id}`,
        { groupTitle },
        { responseType: "text" }
      )
  }

}
