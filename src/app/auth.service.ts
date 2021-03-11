import { TokenStorageService } from './token-storage.service';
import { User } from './user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { text } from '@fortawesome/fontawesome-svg-core';

const AUTH_API = 'http://localhost:8080/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + 'auth-token' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  isUserLoggedIn() {
    let user = localStorage.getItem("currentUser");
    console.log(!(user === null));
    return !(user === null);
  }

  public getToken() {
    let token = localStorage.getItem("currentUser");
    let tokenObject = JSON.parse(token)
    console.log(tokenObject.token);
    return tokenObject.token;
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  authenticate(username, password) {
    return this.http.post<any>(`http://localhost:8080/login`, { username, password })
      .pipe(map(user => {
        console.log(user);

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }



  registerUser(user) {
    return this.http.post<any>('http://localhost:8080/register', {
      username: user.username,
      password: user.password,
      email: user.email
    }, httpOptions)
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
