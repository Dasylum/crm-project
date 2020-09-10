import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(loginCred): Observable<any> {
    return this.http.post('login', loginCred, this.httpOptions);
  }

  isAuthenticated(): any {
    let userData = localStorage.getItem('userInfo');
    if(userData && JSON.parse(userData)) {
      return JSON.parse(userData);
    }
    return false;
  }

  setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
}
