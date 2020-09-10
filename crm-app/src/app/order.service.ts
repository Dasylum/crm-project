import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService : AuthService, private router : Router, private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  placeOrder(product, customer): Observable<any>{
    return this.http.post<any>(`order/${customer}/${product}`, this.httpOptions);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>('orders', this.httpOptions);
  }
}
