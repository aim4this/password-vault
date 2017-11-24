import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {VaultComponent} from './vault.component';
import {VaultService} from '../services/vault.service';
import {SafePipe} from '../pipes/safe.pipe';
import {CopyToClipboardDirective} from '../copy-to-clipboard.directive';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {MockVaultService} from '../services/mock-vault.service';

describe('VaultComponent', () => {
  let component: VaultComponent;
  let fixture: ComponentFixture<VaultComponent>;
  let mockVaultService = new MockVaultService();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        VaultComponent,
        SafePipe,
        CopyToClipboardDirective
      ],
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterTestingModule,
        ClipboardModule
      ],
      providers: [
        { provide: VaultService, useValue: mockVaultService }
      ]
    }).compileComponents();
    TestBed.overrideComponent(VaultComponent, {
      set: {
        providers: [
          { provide: VaultService, useValue: mockVaultService }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the list of passwords upon getting them from the service', () => {
    // Arrange
    const initialAmount = component.passwords.length;

    // Action
    component.ngOnInit();

    // Assert
    expect(component.passwords.length).toBeGreaterThanOrEqual(initialAmount);
  });

  it('should have 1 more password in list after adding one', () => {
    // Arrange
    const initialAmount = component.passwords.length;

    // Action
    component.addPassword({value: 'http://test.com'}, {value: 'test'}, {value: '12345678'})
      .subscribe(
        res => {
          // Assert
          expect(component.passwords.length).toBe(initialAmount + 1);
        },
        err => {
          // Fail
          expect(false).toBe(true);
        }
      );
  });

  it('should remove password from list when being deleted', () => {
    // Arrange
    const removeIndex = 0;
    const removedPassword = component.passwords[removeIndex];

    // Action
    component.removePassword(0)
      .subscribe(
        res => {
          // Assert
          setTimeout(() => {
            expect(component.passwords.indexOf(removedPassword)).toBe(-1);
          }, 2000); // must wait because GUI waits 1000 ms before deleting
        }
      );
  });

  it('should have 1 less password in list after removing one', () => {
    // Arrange
    const initialAmount = component.passwords.length;

    // Action
    component.removePassword(0)
      .subscribe(
        res => {
          // Assert
          setTimeout(() => {
            expect(component.passwords.length).toBe(initialAmount - 1);
          }, 2000); // must wait because GUI waits 1000 ms before deleting
        }
      );
  });
});
