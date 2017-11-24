import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class MockLoginService {

  createUser(email: string, password: string) {
    return Observable.create( (observer: Observer<boolean>) => {
      if (password !== 'Failure123!') {
        observer.next(true);
      } else {
        observer.error(false);
      }
    });
  }

  login(email: string, password: string) {
    return Observable.create( (observer: Observer<boolean>) => {
      if (email === 'test@test.com' && password === '12345678') {
        observer.next(true);
      } else {
        observer.error(false);
      }
    });

  }

}
