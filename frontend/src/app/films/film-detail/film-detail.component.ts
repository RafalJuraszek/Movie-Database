import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilmModel} from '../film.model';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnChanges {

  private readonly MAX_NUMBER_OF_STARS = 5;
  @Input() film: FilmModel;

  rating;
  show = false;
  ratings;

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    console.log(this.film);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.show = false;
    this.filmService.getRatings(this.film.id).subscribe((result) => {
      let stars = 0;
      this.show = true;
      this.ratings = result;
      if(result.length === 0) {
        this.rating = 0;
        return;
      }

      for (let i = 0; i < result.length; i++) {
        stars += result[i].stars;
      }
      this.rating = stars / result.length;

    });
    console.log('elo');
  }


  private get numberOfFullStars(): number {

    return Math.floor(this.rating);

  }


  private get numberOfEmptyStars(): number {

    return this.MAX_NUMBER_OF_STARS - Math.ceil(this.rating);

  }


  get fullStars(): any[] {

    return Array(this.numberOfFullStars);

  }


  get emptyStars(): any[] {

    return Array(this.numberOfEmptyStars);

  }


  get hasAnHalfStar(): boolean {

    return this.rating % 1 !== 0;

  }


}
