import { Injectable } from '@angular/core';

import { Customer } from './customer';
import { Product } from './product';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products', this.httpOptions)
  }

  addProduct(ProductData, id): Observable<any> {
    return this.http.post<any>(`products/add/${id}`, ProductData, this.httpOptions);
  }

  deleteProduct(productId): Observable<any> {
    return this.http.delete<any>(`product/delete/${productId}`, this.httpOptions);
  }
}