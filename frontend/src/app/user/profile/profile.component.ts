import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {RelationshipService} from '../services/relationship.service';
import {RatingService} from '../services/rating.service';

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
  ratingsFilms;

  constructor(private authService: AuthService, private relationshipService: RelationshipService, private ratingService: RatingService) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.ratingService.findUserRatings(this.currentUser.username).subscribe(result => {
      this.ratingsFilms = result;
      this.data[0].number = (result as []).length;
    });
    this.relationshipService.getFollowersAndFollowing(this.currentUser.username).subscribe(result => {
      this.data[1].number = result.inDegree;
      this.data[2].number = result.outDegree;
    });

  }

}
