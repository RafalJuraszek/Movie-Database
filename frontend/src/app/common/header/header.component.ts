import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.oauthService.revokeTokenAndLogout();
    localStorage.removeItem('jwt_access_token');
    await this.router.navigateByUrl('/');
    this.authService.isAuthenticated.next(false);

  }

}
