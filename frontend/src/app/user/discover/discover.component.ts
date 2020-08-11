import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthService} from '../../auth/auth.service';
import {UserPayload} from '../../payload/user.payload';
import {FollowRequestPayload} from '../../payload/follow-request.payload';
import {RelationshipService} from '../services/relationship.service';
import {UserModel} from '../model/user.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  users: UserModel[];
  currentUser: UserModel;

  constructor(private authService: AuthService, private userService: UserService, private relationshipService: RelationshipService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      this.relationshipService.findFollowing(this.currentUser.username).subscribe(followings => {
        console.log(followings);
        this.users = users.filter(user => !(followings.find(followingUser => followingUser.username === user.username) || user.username === this.currentUser.username));
      });
    });
  }

  follow(followedUser) {
    const follower = new UserPayload(this.currentUser.id, this.currentUser.username, this.currentUser.name);
    console.log(followedUser);
    const following = new UserPayload(followedUser.id, followedUser.username, followedUser.name);

    const followRequest = new FollowRequestPayload(follower, following);
    this.relationshipService.follow(followRequest).subscribe(res => {
      console.log(res);
      const index = this.users.indexOf(followedUser);
      this.users.splice(index, 1);
    });

  }


}
