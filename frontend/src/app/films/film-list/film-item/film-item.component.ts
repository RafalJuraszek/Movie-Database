import {Component, Input, OnInit} from '@angular/core';
import {FilmModel} from '../../film.model';
import {FilmService} from '../../film.service';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {

  @Input() film: FilmModel;

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
  }

  onSelect() {
    this.filmService.filmSelected.emit(this.film);
  }

}
