import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClient {

  constructor(private http: HttpHeaders) {}

  createAuthorizationHeader(headers: HttpHeaders) {
  
  }
}