import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { catchError, finalize, retry } from "rxjs/operators";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _CookieService: CookieService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this._CookieService.get("Token")) {
      let token = this._CookieService.get("Token");
      request = request.clone({
        setHeaders: {
          "x-login-token": token
        }
      });
    }
    return next.handle(request)
        .pipe(
            retry(2),
            catchError((_error: HttpErrorResponse)=>{
                return throwError(_error);
            }),
            finalize(()=>{
                console.log(`method: ${request.method}, url: ${request.urlWithParams}`)
            })
        )
  }
}
