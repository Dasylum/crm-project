import { Injectable } from '@angular/core';

import { Customer } from './customer';
import { Category } from './category';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('products/categories', this.httpOptions)
  }

  addCategory(CategoryData): Observable<any> {
    return this.http.post<any>('products/categories/add', CategoryData, this.httpOptions);
  }

  getOneCategory(id): Observable<Category[]> {
    return this.http.get<Category[]>(`categories/${id}`, this.httpOptions);
  }

  getProductsinCategory(id): Observable<Product[]> {
    return this.http.get<Product[]>(`category/products/${id}`, this.httpOptions);
  }
}
