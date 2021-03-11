import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(data => {
      this.user = data;
      console.log(data);
    }
    );

  }
}
