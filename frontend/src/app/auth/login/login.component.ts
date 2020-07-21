import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private oAuthService: OAuthService, private fb: FormBuilder, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private authService: AuthService) {

    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

  }

  public login() {
    this.oAuthService.initCodeFlow();
  }

  public onSubmit() {
    if (!this.validateForm.valid) {
      return;
    }

    const value = this.validateForm.value;

    this.authService.signIn(value.userName, value.password).subscribe(res => {
      console.log(res);
    });
  }


}
