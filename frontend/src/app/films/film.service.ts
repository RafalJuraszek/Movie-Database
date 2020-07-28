import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RatingModel} from './rating.model';
import {RatingRequest} from '../payload/rating-request.payload';
import {AuthService} from '../auth/auth.service';
import {Config} from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  BASIC_FILM_URL: string = Config.BASIC_URL + 'film-service/films';
  BASIC_RATING_URL: string = Config.BASIC_URL + 'rating-service/ratings/';
  filmSelected = new EventEmitter();
  showHeader = new EventEmitter();
  username;

  constructor(private httpService: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      if (user !== null) {
        this.username = user.username;
      }

    });
  }

  getFilms() {
    return this.httpService.get(this.BASIC_FILM_URL);
  }

  getRatingsByFilmId(filmId) {
    const params = new HttpParams().set('id', filmId);
    return this.httpService.get<Array<RatingModel>>(this.BASIC_RATING_URL, {params});
  }

  getRatingByFilmIdAndUsername(filmId) {
    const params = new HttpParams().set('id', filmId);
    return this.httpService.get<RatingModel>(this.BASIC_RATING_URL + this.username, {params});
  }

  addRating(ratingRequest) {
    return this.httpService.post<RatingRequest>(this.BASIC_RATING_URL, ratingRequest);
  }
}
