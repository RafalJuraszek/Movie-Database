import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth/auth.config';
import {FilmService} from './films/film.service';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  show = false;


  constructor(private oauthService: OAuthService, private filmService: FilmService, private router: Router, private authService: AuthService) {
    this.authService.isAuthenticated.subscribe(flag => {
      this.show = flag;
    })
  }




  async ngOnInit() {
    console.log('app component log');
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken());


    if(this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken() || localStorage.getItem('jwt_access_token')) {
      // this.show = true;
      this.authService.isAuthenticated.next(true);
    }


  }



}
