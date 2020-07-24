import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data = [
    {
      name: 'ratings',
      number: 10
    },
    {
      name: 'followers',
      number: 15
    },
    {
      name: 'following',
      number: 20
    }
  ];
  currentUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

}
