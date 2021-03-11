import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { Book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map, shareReplay, retryWhen } from 'rxjs/operators';
import { error } from 'jquery';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + 'auth-token' })
};
@Injectable({
  providedIn: 'root'
})

export class BookService {
  private keyword;

  private baseUrl = 'http://localhost:8080/book';
  private _searchUrl = 'http://localhost:8080/search';
  private _searchByUrl = 'http://localhost:8080/searchByCagname'


  constructor(private http: HttpClient, private authService: AuthService) { }

  /* CRUD API */

  getBookList(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get<any>(`${this.baseUrl}`, httpOptions);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  createBook(book: object): Observable<object> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })
    };
    return this.http.post(`${this.baseUrl}`, book, httpOptions);
  }

  deleteBook(bid: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.delete(`${this.baseUrl}/${bid}`, httpOptions);
  }

  getBook(bid: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get(`${this.baseUrl}/${bid}`, httpOptions);
  }

  updateBook(bid: number, value: any): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.post(`${this.baseUrl}`, value, httpOptions);
  }


  getData(book: Book) {
    let url = this._searchUrl;
    return this.http.post<any>(url + '/searchText', book);
  }


  /* Search API */
  searchBooks(term: string): Observable<Book[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };

    // term = term.trim();
    const options = term ?
      { params: new HttpParams().set('keyword', term) } : {};
    // if (!term.trim()) {
    //   return of();
    return this.http.get<any>(this._searchUrl + '?keyword=' + term, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  handleError(error) {
    let errorMessage = 'Book not found';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  updateBookBySearch(book: Book): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };

    return this.http.put(this.baseUrl, book, httpOptions).pipe(
      tap(_ => console.log(`updated book bid =${book.bid}`)),
      catchError(this.handleError)
    );
  }

  // Search By Category Name
  searchByCag(term1: string): Observable<Book[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };

    // term = term.trim();
    const options = term1 ?
      { params: new HttpParams().set('keyword', term1) } : {};
    // if (!term.trim()) {
    //   return of();
    return this.http.get<any>(this._searchByUrl + '?keyword=' + term1, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }



}
