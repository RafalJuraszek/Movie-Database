import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private oAuthService: OAuthService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

  }

  public onSubmit() {
    if (!this.validateForm.valid) {
      return;
    }

    const value = this.validateForm.value;

    this.authService.signUp(value.name, value.email, value.username, value.password).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }
}
