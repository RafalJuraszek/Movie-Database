import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  public isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);

  BASIC_URL: string = 'http://localhost:4200/api/';

  constructor(private httpClient: HttpClient) {
  }

  public signIn(username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'auth/signin', {username, password})
      .pipe(tap(res => {
        this.isAuthenticated.next(true);
        this.setSession(res);
      }), share());
    ;
  }

  public signUp(name: string, email: string, username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'auth/users', {username, password, email, name});
  }


  private setSession(authResult) {
    localStorage.setItem('jwt_access_token', authResult.accessToken);

  }
}
