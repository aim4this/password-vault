import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {LoginService} from '../services/login.service';
import {HttpModule} from '@angular/http';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {MockLoginService} from '../services/mock-login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService = new MockLoginService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        LoadingSpinnerComponent
      ],
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService}
      ]
    }).compileComponents();
    TestBed.overrideComponent(LoginComponent, {
      set: {
        providers: [
          { provide: LoginService, useValue: mockLoginService}
        ]
      }
    });
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully when passed correct email and password', () => {
    component.attemptLogin('test@test.com', '12345678')
      .subscribe(
        res => {
          // pass
          expect(res).toBeTruthy();
        },
        err => {
          // fail
          expect(false).toBe(true);
        }
      );
  });

  it('should fail login when passed incorrect email', () => {
    component.attemptLogin('wrong@email.com', '12345678')
      .subscribe(
        res => {
          // fail
          expect(false).toBe(true);
        },
        err => {
          // pass
          expect(err).toBeFalsy();
        }
      );
  });

  it('should fail login when passed incorrect password', () => {
    component.attemptLogin('test@test.com', 'wrongPassword')
      .subscribe(
        res => {
          // fail
          expect(false).toBe(true);
        },
        err => {
          // pass
          expect(err).toBeFalsy();
        }
      );
  });
});
