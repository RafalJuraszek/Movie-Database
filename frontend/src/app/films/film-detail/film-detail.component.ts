import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilmModel} from '../film.model';
import {FilmService} from '../film.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit, OnChanges {
  @Input() film: FilmModel;

  rating;
  show = false;
  ratings;

  constructor(private filmService: FilmService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.film);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.show = false;
    this.filmService.getRatingsByFilmId(this.film.id).subscribe((result) => {
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

  }

  checkFilm() {
    this.router.navigateByUrl('/checkFilm', {state: {film : this.film, rate: this.rating}});
  }


}
