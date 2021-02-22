import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl = 'http://localhost:8080/book';

  constructor(private http:HttpClient) { }

  getBookList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createBook(book: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, book);
  }

  deleteBook(bid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bid}`, { responseType: 'text' });
  }

  getBook(bid: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${bid}`);
  }

  updateBook(bid: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, value);
  }
  
}                                           