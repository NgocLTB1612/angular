import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/username';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPublicContent(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get(`${this.API_URL}` + '', httpOptions);
  }
  getUserBoard(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get(`${this.API_URL}`, httpOptions);
  }
  getLoggedUser(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + this.authService.getToken()
      })

    };
    return this.http.get<any>(`${this.API_URL}`, httpOptions)
  }
}
