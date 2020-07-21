import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {FilmService} from '../films/film.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;


  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe( (isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }


}
