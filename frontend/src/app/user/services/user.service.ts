import {Config} from '../../common/constants';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  BASIC_URL: string = Config.BASIC_URL;

  constructor(private httpService: HttpClient) {
  }

  getAllUsers() {
    return this.httpService.get(this.BASIC_URL + 'auth/users');

  }
}
