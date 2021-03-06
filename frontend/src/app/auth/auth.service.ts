import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';
import {Config} from '../common/constants';

@Injectable()
export class AuthService {
  public isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject(null);
  BASIC_URL: string = Config.BASIC_URL + 'auth/';


  constructor(private httpClient: HttpClient) {
  }

  public signIn(username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'signin', {username, password})
      .pipe(tap(res => {
        this.setSession(res);

        this.getCurrentUser().subscribe(user => {
          this.isAuthenticated.next(true);
        });


      }), share());

  }

  public signUp(name: string, email: string, username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'users', {username, password, email, name});
  }

  public getCurrentUser() {
    return this.httpClient.get(this.BASIC_URL + 'users/me')
      .pipe(tap(user => {
        this.currentUser.next(user);
    }));

  }


  private setSession(authResult) {
    localStorage.setItem('jwt_access_token', authResult.accessToken);

  }


}
