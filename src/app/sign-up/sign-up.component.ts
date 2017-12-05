import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loggingIn = false;
  signUpFailed = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    const data = loginForm.value;
    this.attemptSignup(data.email, data.phone, data.password, data.password_confirmation);
  }

  attemptSignup(email: string, phone: string, password: string, password_confirmation: string) {
    this.signUpFailed = false;
    this.loginService.createUser(email, phone, password, password_confirmation)
      .subscribe(
        json => {
          this.router.navigate(['/']);
          console.log(json);
        },
        err => {
          this.signUpFailed = true;
        }
      );
  }

}
