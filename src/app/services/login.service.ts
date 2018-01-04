import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {

  API_URL = environment.apiURL;
  authOptions = new RequestOptions({
    headers: new Headers(
      {
        'Content-Type': 'application/json'
      }
    )
  });
  headerKeys = ['access-token', 'client', 'expiry', 'token-type', 'uid'];
  userId: number;

  constructor(private http: Http) {}

  createUser(email: string, phone: string, password: string, password_confirmation: string) {
    const params = {
      email: email,
      phone: phone,
      password: password,
      password_confirmation: password_confirmation
    };
    return this.http.post(this.API_URL + 'auth', params).map(
      res => {
        return res.json();
      }
    );
  }

  login(email: string, password: string) {
    const params = {
      'email': email,
      'password': password
    };
    return this.http.post(this.API_URL + 'auth/sign_in', params, this.authOptions).map(
      res => {
        this.setHeaders(res.headers);
        this.userId = res.json().data.id;
        return true;
      },
      err => {
        return false;
      }
    );
  }

  setHeaders(headers: Headers) {
    if (this.checkIfDeviseHeaders(headers)) {
      this.authOptions.headers = new Headers({
        'Content-Type': 'application/json',
        'access-token': headers.get('access-token'),
        'client': headers.get('client'),
        'expiry': headers.get('expiry'),
        'token-type': headers.get('token-type'),
        'uid': headers.get('uid')
      });
    } else {
      console.warn('Didn\'t set auth headerKeys because they were not present.');
    }
  }


  // Check if headers contain all 5 Devise Auth Headers
  checkIfDeviseHeaders(headers: Headers) {
    return this.checkKeysInHeaders(headers, this.headerKeys);
  }

  // Iterates over a set of keys and checks for each of them if they exist in the Headers object
  private checkKeysInHeaders(headers: Headers, keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
      if (this.checkHeaderExists(headers, keys[i]) === false) {
        // There was found a value where the key didn't exist
        return false;
      }
    }
    return true;
  }

  // Check if one specific key exists in a Headers object
  private checkHeaderExists(headers: Headers, key) {
    //  hacky way to cast to boolean !!
    return !!headers.get(key);
  }

}
