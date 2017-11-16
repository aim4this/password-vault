import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginFailed = false;
  fadeIn = true;
  loggingIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.fadeIn = false;
    }, 1500);
  }

  onSubmit(loginForm) {
    this.loggingIn = true;
    setTimeout(() => {
      this.attemptLogin(loginForm);
    }, 400);
  }

  attemptLogin(loginForm) {
    const data = loginForm.value;
    this.loginService.login(data.email, data.password).subscribe(
      res => {
        this.loginSuccess();
      },
      err => {
        this.loggingIn = false;
        this.loginFailure();
      }
    );
  }

  loginSuccess() {
    this.router.navigate(['/vault']);
  }

  loginFailure() {
    this.loginFailed = true;
    setTimeout(() => {
      this.loginFailed = false;
    }, 500);
  }

}
