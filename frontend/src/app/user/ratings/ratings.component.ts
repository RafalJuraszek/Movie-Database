import {Component, Input, OnInit} from '@angular/core';
import {RatingService} from './rating.service';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input('username') username;
  data: ItemData[] = [];
  value = 5;
  ratingsFilms;

  constructor(private ratingService: RatingService) {
  }
  ngOnInit(): void {
    this.ratingService.findUserRatings(this.username).subscribe(result => {
      this.ratingsFilms = result;
    });
  }

}
