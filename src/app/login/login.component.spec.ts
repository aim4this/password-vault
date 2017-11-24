import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {LoginService} from '../services/login.service';
import {HttpModule} from '@angular/http';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        LoginService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should begin logging in when login or enter is pressed', () => {
    // Action
    component.attemptLogin('', '');

    // Assert
    expect(component.loggingIn).toBe(true);
  });

  it('should login successfully when passed correct email and password', () => {
    component.attemptLogin('test@test.com', '12345678')
      .subscribe(
        res => {
          // pass
          expect(res).toBe(false);
        },
        err => {
          // fail
          expect(false).toBe(true);
        }
      );
  });



});
