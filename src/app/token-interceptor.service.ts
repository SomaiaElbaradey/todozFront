import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { catchError, finalize, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  private headers: HttpHeaders  = new HttpHeaders().append('x-login-token', localStorage.getItem("todozToken"));
  intercept(req, next){
    let token = req.clone({
      setHeaders: {
        Authorization: `todoKey`,
        'x-login-token': localStorage.getItem("todozToken")
      }
    })
    return next.handle(token)
    .pipe(
      retry(2),
      catchError((_error: HttpErrorResponse) => {
        return throwError(_error);
      }),
      finalize(() => {
        console.log(`method: ${req.method}, url: ${req.urlWithParams}`);
        // console.log(this.headers);
      })
    )
  }
}