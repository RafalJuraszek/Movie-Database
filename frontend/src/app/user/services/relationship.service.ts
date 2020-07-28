import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../common/constants';
import {RelationshipResponsePayload} from '../../payload/relationship-response.payload';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  API_URL = Config.BASIC_URL + 'graph/';

  constructor(private httpService: HttpClient) {
  }

  getFollowersAndFollowing(username) {
    return this.httpService.get<RelationshipResponsePayload>(this.API_URL + 'users/' + username + '/degree');
  }


}
