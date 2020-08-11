import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {RelationshipService} from '../services/relationship.service';
import {RatingService} from '../services/rating.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {UserPayload} from '../../payload/user.payload';
import {FollowRequestPayload} from '../../payload/follow-request.payload';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {

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
  username;
  ratingsFilms;
  currentUser;
  loggedUser;
  isFollowing;

  constructor(private authService: AuthService, private relationshipService: RelationshipService, private ratingService: RatingService, private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.username = params.username;
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.loggedUser = user;
    });
    this.userService.getUserInfo(this.username).subscribe(result => {
      console.log(result);
      this.currentUser = result;
      this.relationshipService.isFollowing(this.loggedUser.username, this.username).subscribe(isFollowing => {
        this.isFollowing = isFollowing;
      });
    });
    this.ratingService.findUserRatings(this.username).subscribe(result => {
      this.ratingsFilms = result;
      this.data[0].number = (result as []).length;
    });
    this.relationshipService.getFollowersAndFollowing(this.username).subscribe(result => {
      this.data[1].number = result.inDegree;
      this.data[2].number = result.outDegree;
    });

  }

  follow() {
    if (this.isFollowing) {
      console.log('You already follow this user');
      return;
    }
    const follower = new UserPayload(this.loggedUser.id, this.loggedUser.username, this.loggedUser.name);
    console.log(this.currentUser);
    const following = new UserPayload(this.currentUser.id, this.currentUser.username, this.currentUser.name);

    const followRequest = new FollowRequestPayload(follower, following);
    this.relationshipService.follow(followRequest).subscribe(res => {
      console.log(res);
      this.isFollowing = true;
      this.relationshipService.getFollowersAndFollowing(this.username).subscribe(result => {
        this.data[1].number = result.inDegree;
        this.data[2].number = result.outDegree;
      });

    });

  }

}
