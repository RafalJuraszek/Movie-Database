import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../common/constants';

@Injectable()
export class RatingService {
  BASIC_URL: string = Config.BASIC_URL;

  constructor(private httpService: HttpClient) {
  }

  public findUserRatings(username) {
    return this.httpService.get(this.BASIC_URL + 'rating-service/ratings/' + username + '/in');
  }
}
