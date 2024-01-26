import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  signup(body: Object): Observable<any> {
    return this.http.post('http://localhost:8000/auth/signup/', body);
  }

  signin(body: Object): Observable<any> {
    return this.http.post('http://localhost:8000/auth/signin/', body);
  }
}
