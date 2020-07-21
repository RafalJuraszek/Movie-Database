import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RatingModel} from './rating.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  BASIC_FILM_URL: string = 'http://localhost:4200/api/film-service/';
  BASIC_RATING_URL: string = 'http://localhost:4200/api/rating-service/';
  filmSelected = new EventEmitter();
  showHeader = new EventEmitter();

  constructor(private httpService: HttpClient) {
  }

  getFilms() {
    return this.httpService.get(this.BASIC_FILM_URL + 'films');
  }

  getRatings(filmId) {
    const params = new HttpParams().set('id', filmId);
    return this.httpService.get<Array<RatingModel>>(this.BASIC_RATING_URL + 'ratings', {params});
  }

  addRating(rating) {
    return this.httpService.post<RatingModel>(this.BASIC_RATING_URL + 'ratings', rating);
  }
}
