import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { FilmListComponent } from './films/film-list/film-list.component';
import { FilmDetailComponent } from './films/film-detail/film-detail.component';
import { FilmItemComponent } from './films/film-list/film-item/film-item.component';
import {FilmService} from './films/film.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AuthInterceptor} from './auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RatingModule} from 'ng-starrating';
import { HeaderComponent } from './common/header/header.component';
import {
  NzAffixModule, NzAvatarModule, NzButtonModule, NzCardModule, NzCommentModule, NzDescriptionsModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule, NzListModule,
  NzMenuModule, NzRateModule,
  NzRowDirective, NzTabsModule, NzTypographyModule
} from 'ng-zorro-antd';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/app.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FilmViewComponent } from './films/film-view/film-view.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RatingsComponent } from './user/ratings/ratings.component';
import {RatingService} from './user/services/rating.service';
import { DiscoverComponent } from './user/discover/discover.component';
import {UserService} from './user/services/user.service';
import { OtherProfileComponent } from './user/other-profile/other-profile.component';



const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'films', canActivate: [AuthGuard], component: FilmsComponent},
  {path: 'checkFilm', canActivate: [AuthGuard], component: FilmViewComponent},
  {path: 'users/me', canActivate: [AuthGuard], component: ProfileComponent},
  {path: 'users/:username', canActivate: [AuthGuard], component: OtherProfileComponent},
  {path: 'discover', canActivate: [AuthGuard], component: DiscoverComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    FilmListComponent,
    FilmDetailComponent,
    FilmItemComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FilmViewComponent,
    ProfileComponent,
    RatingsComponent,
    DiscoverComponent,
    OtherProfileComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RatingModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzAffixModule,
    NzFormModule,
    NzButtonModule,
    NzRateModule,
    NzAvatarModule,
    NzTypographyModule,
    NzListModule,
    NzCommentModule,
    NzDescriptionsModule,
    NzInputModule,
    NzTabsModule,
    NzCardModule
  ],
  providers: [FilmService ,     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthService, AuthGuard, RatingService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
