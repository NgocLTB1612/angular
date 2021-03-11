import { AuthService } from './auth.service';

import { User } from './user';
import { TokenStorageService } from './token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Thumucsach';
  currentUser: User;

  constructor(private tokenStorageService: TokenStorageService, private authentocationService: AuthService) {
    this.authentocationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit(): void {

  }


  logout(): void {
    this.authentocationService.logOut();
    this.tokenStorageService.signOut();
  }
}

