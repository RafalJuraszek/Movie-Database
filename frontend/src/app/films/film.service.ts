import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RatingModel} from './rating.model';
import {RatingRequest} from '../payload/rating-request.payload';

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

  getRatingsByFilmId(filmId) {
    const params = new HttpParams().set('id', filmId);
    return this.httpService.get<Array<RatingModel>>(this.BASIC_RATING_URL, {params});
  }

  getRatingByFilmIdAndUsername(filmId) {
    const params = new HttpParams().set('id', filmId);
    return this.httpService.get<RatingModel>(this.BASIC_RATING_URL + 'rating', {params});
  }

  addRating(ratingRequest) {
    return this.httpService.post<RatingRequest>(this.BASIC_RATING_URL, ratingRequest);
  }
}
