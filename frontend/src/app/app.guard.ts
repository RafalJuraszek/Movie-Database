import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private oAuthService: OAuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const hasIdToken = this.oAuthService.hasValidIdToken();
    const hasAccessToken = this.oAuthService.hasValidAccessToken();
    console.log('guard log')

    if (hasAccessToken && hasIdToken || localStorage.getItem('jwt_access_token')) {
      return true;
    } else {
        this.router.navigateByUrl('/');
        return false;
    }

  }

}
