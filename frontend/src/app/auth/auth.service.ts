import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  public isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject(null);
  BASIC_URL: string = 'http://localhost:4200/api/';


  constructor(private httpClient: HttpClient) {
  }

  public signIn(username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'auth/signin', {username, password})
      .pipe(tap(res => {
        this.setSession(res);

        this.getCurrentUser().subscribe(user => {
          this.isAuthenticated.next(true);
        });


      }), share());

  }

  public signUp(name: string, email: string, username: string, password: string) {
    return this.httpClient.post(this.BASIC_URL + 'auth/users', {username, password, email, name});
  }

  public getCurrentUser() {
    return this.httpClient.get(this.BASIC_URL + 'auth/users/me')
      .pipe(tap(user => {
        this.currentUser.next(user);
    }));

  }


  private setSession(authResult) {
    localStorage.setItem('jwt_access_token', authResult.accessToken);

  }


}
