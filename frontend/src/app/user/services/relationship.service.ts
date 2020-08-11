import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../common/constants';
import {RelationshipResponsePayload} from '../../payload/relationship-response.payload';
import {FollowRequestPayload} from '../../payload/follow-request.payload';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';

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
  follow(followRequest: FollowRequestPayload) {
    return this.httpService.post<FollowRequestPayload>(this.API_URL + 'users/followers', followRequest);
  }
  findFollowing(username): Observable<any> {
    return this.httpService.get<any>(this.API_URL + 'users/' + username + '/following');
  }
  isFollowing(usernameA, usernameB): Observable<boolean> {
    return this.httpService.get<boolean>(this.API_URL + 'users/' + usernameA + '/following' + usernameB);
  }


}
