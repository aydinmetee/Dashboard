import { Product } from './../models/product';
import { Account } from './../models/account';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Task } from '../models/task';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  path = 'http://localhost:3000';
  account: Account[];
  month: any[];
  income: number[];
  expense: number[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'creater',
    }),
  };

  constructor(private http: HttpClient) {}

  getAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(this.path + '/account');
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.path + '/tasks');
  }
  createTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.path + '/tasks', task, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  deleteTask(id:number):Observable<{}>{
    const url = `${this.path}/tasks/${id}`;
    return this.http.delete(url,this.httpOptions).pipe(catchError(this.handleError));
  }
  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.path + '/products');
  }
  getMostSale(): Observable<Product[]>{
    return this.http.get<Product[]>(this.path + '/topsale');
  }
  getTotals():Observable<any[]>{
    return this.http.get<any[]>(this.path+"/totalsale");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
