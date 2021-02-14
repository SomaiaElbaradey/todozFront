import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private _HttpClient: HttpClient,
    private router: Router,
  ) { }

  private baseURL: string = `${environment.api}/api/post/`

  //get all general tasks
  public allTasks(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}todos`)
  }
  
  //delete one task
  public deleteTask(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}todos/${id}`)
  }

  //add new todo
  public addTodo(title: string, body: string, status:string, tags, _todo): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}todos`,
        { title, body, tags, _todo, status  },
        { responseType: "text" }
      )
  }

  //update exisiting todo
  public updateTodo(title, body, status, tags, id): Observable<any> {
    return this._HttpClient
      .patch(
        `${this.baseURL}todo/${id}`,
        { title, body, tags, status },
        { responseType: "text" }
      )
  }

}
