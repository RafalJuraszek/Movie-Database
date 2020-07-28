import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  users;
  currentUser;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  get filteredUsers() {
    return this.users.filter(user => user.username !== this.currentUser.username);
  }


}
