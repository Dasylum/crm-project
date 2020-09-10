import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService : AuthService, private router : Router, private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  canActivate() {
    if(this.authService.isAuthenticated()) {
      return this.authService.isAuthenticated();
    }

    this.router.navigate(['login']);
    return false;
  }

  logout() {
    localStorage.removeItem('userInfo');
  }
  
}
