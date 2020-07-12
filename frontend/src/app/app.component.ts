import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth.config';
import {FilmService} from './films/film.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  show = false;


  constructor(private oauthService: OAuthService, private filmService: FilmService, private router: Router) {
    this.filmService.showHeader.subscribe(flag => {
      this.show = flag;
    })
  }
  async logout() {
    await this.oauthService.revokeTokenAndLogout();
    await this.router.navigateByUrl('/');
    this.show = false;

  }



  async ngOnInit() {
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken());


    if(this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
      this.show = true;
    }


  }



}
