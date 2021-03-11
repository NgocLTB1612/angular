import { Category } from './category';
import { AuthService } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, tap, map, shareReplay, retryWhen } from 'rxjs/operators';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url = 'http://localhost:8080/cag';
  private _urlSearch = 'http://localhost:8080/searchCag';

  constructor(private http: HttpClient, private authService: AuthService) { }
  getCategoryList(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get(`${this._url}`, httpOptions);
  }
  getCategory(cid: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })
    };

    return this.http.get(`${this._url}/${cid}`, httpOptions);
  }

  /* Search API */
  searchCategory(term2: string): Observable<Category[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };

    term2 = term2.trim();
    const options = term2 ?
      { params: new HttpParams().set('keyword', term2) } : {};
    // if (!term.trim()) {
    //   return of();
    return this.http.get<any>(this._urlSearch + '?keyword=' + term2, httpOptions)
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



}
