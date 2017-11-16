import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {Http} from '@angular/http';

@Injectable()
export class VaultService {

  constructor(private http: Http, private loginService: LoginService) { }

  getPasswords() {
    return this.http.get(this.loginService.API_URL + 'users/' + this.loginService.userId + '/passwords', this.loginService.authOptions)
      .map(
        res => {
          this.loginService.setHeaders(res.headers);
          return res;
        }
      );
  }

  createPassword(url, username, password) {
    const params = {
      url: url,
      username: username,
      encrypted_password: password
    };
    return this.http.post(this.loginService.API_URL + 'users/' + this.loginService.userId + '/passwords', params, this.loginService.authOptions)
      .map(
        res => {
          this.loginService.setHeaders(res.headers);
          return res;
        }
      );
  }

  updatePassword(passwordId, url, username, password) {
    const params = {
      url: url,
      username: username,
      encrypted_password: password
    };
    return this.http.patch(this.loginService.API_URL + 'users/' + this.loginService.userId + '/passwords/' + passwordId, params, this.loginService.authOptions)
      .map(
        res => {
          this.loginService.setHeaders(res.headers);
          return res;
        }
      );
  }

  deletePassword(passwordId) {
    return this.http.delete(this.loginService.API_URL + 'users/' + this.loginService.userId + '/passwords/' + passwordId, this.loginService.authOptions)
      .map(
        res => {
          this.loginService.setHeaders(res.headers);
          return res;
        }
      );
  }

  getPassword(passwordId) {
    return this.http.get(this.loginService.API_URL + 'users/' + this.loginService.userId + '/passwords/' + passwordId, this.loginService.authOptions)
      .map(
        res => {
          this.loginService.setHeaders(res.headers);
          return res;
        }
      );
  }

}
