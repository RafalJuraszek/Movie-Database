import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films;
  ratings;
  show = false;

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
      this.show = true;
    });
    // this.filmService.getRatings(null).subscribe(ratings => {
    //   this.ratings = ratings;
    // }

  }


}
