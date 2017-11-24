import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class MockVaultService {

  constructor() { }

  getPasswords() {
    return Observable.create((observer: Observer<any>) => {
      observer.next(
        [
          {id: 1, url: 'http://test1.com/', title: 'test1.com', username: 'simon1', encrypted_password: 'aow84hfja9w83hfdaw0', user_id: 1},
          {id: 2, url: 'http://test2.com/', title: 'test2.com', username: 'simon2', encrypted_password: 'aow84hfja9w83hfdaw0', user_id: 1},
          {id: 3, url: 'http://test3.com/', title: 'test3.com', username: 'simon3', encrypted_password: 'aow84hfja9w83hfdaw0', user_id: 1},
          {id: 4, url: 'http://test4.com/', title: 'test4.com', username: 'simon4', encrypted_password: 'aow84hfja9w83hfdaw0', user_id: 1}
        ]
      )
    });
  }

  createPassword(url, username, password) {
    return Observable.create((observer: Observer<any>) => {
      if (url === 'fail') {
        observer.error({error: 'error happened'});
      } else {
        observer.next(
          {message: 'Created!'}
        );
      }
    });
  }

  updatePassword(passwordId, url, username, password) {
    return Observable.create((observer: Observer<any>) => {
      if (password === 'fail') {
        observer.error({error: 'error happened'});
      } else {
        observer.next(
          {id: passwordId, url: url, title: url.replace('http://', ''), username: username, encrypted_password: 'weoiwoifjewoi', user_id: 1}
        );
      }
    });
  }

  deletePassword(passwordId) {
    return Observable.create((observer: Observer<any>) => {
      if (passwordId === 1337) {
        observer.error({error: 'error happened'});
      } else {
        observer.next(true);
      }
    });
  }

  getPassword(passwordId) {
    return Observable.create((observer: Observer<any>) => {
      if (passwordId === 1337) {
        observer.error({error: 'error happened'});
      } else {
        observer.next(
          {id: passwordId, url: 'http://test1.com/', title: 'test1.com', username: 'simon1', encrypted_password: 'aow84hfja9w83hfdaw0', user_id: 1}
        );
      }
    });
  }

}
