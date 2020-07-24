import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RatingService {
  BASIC_URL: string = 'http://localhost:4200/api/';

  constructor(private httpService: HttpClient) {
  }

  public findUserRatings(username) {
    return this.httpService.get(this.BASIC_URL + 'rating-service/ratings/' + username + '/in');
  }
}
