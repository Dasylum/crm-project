import { Injectable } from '@angular/core';
import { Customer } from './customer';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('users', this.httpOptions)
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>('add', customer, this.httpOptions).pipe(
      tap((newcustomer: any) => this.log('Customer added')),
      catchError(this.handleError<any>('addCustomer'))
    )
  }

  searchCustomers(term: string): Observable<Customer[]> {
    if ( !term.trim() ) {
      return of([]);
    }

    else {
      return this.http.get<Customer[]>(`search/${term}`).pipe(
        tap(x => x.length ?
          this.log(`found customers matching "${term}"`):
          this.log("no such customers found")
          ),
          catchError(this.handleError<Customer[]>('searchCustomers', []))
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
