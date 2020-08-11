import {Component, Input, OnInit} from '@angular/core';
import {RatingService} from '../services/rating.service';

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
  @Input('ratingsFilms') ratingsFilms;
  data: ItemData[] = [];
  value = 5;


  constructor() {
  }
  ngOnInit(): void {
  }

}
