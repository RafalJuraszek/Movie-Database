import {Config} from '../../common/constants';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user.model';

@Injectable()
export class UserService {
  BASIC_URL: string = Config.BASIC_URL;

  constructor(private httpService: HttpClient) {
  }

  getAllUsers(): Observable<[UserModel]> {
    return this.httpService.get<[UserModel]>(this.BASIC_URL + 'auth/users/summary');

  }
  getUserInfo(username): Observable<UserModel> {
    return this.httpService.get<UserModel>(this.BASIC_URL + 'auth/users/summary/' + username);
  }
}
