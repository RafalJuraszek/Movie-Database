import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FilmService} from './film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{

  selectedFilm;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.filmSelected
      .subscribe(
        (film) => {
          this.selectedFilm = film;
        }
      );
  }



}
