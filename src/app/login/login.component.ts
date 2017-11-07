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

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    const data = loginForm.value;
    this.loginService.login(data.email, data.password).subscribe(
      res => {
        console.log(res.json());
        this.loginSuccess();
      },
      err => {
        console.log(err.json());
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
