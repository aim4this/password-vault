import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {Routing} from './app.routing';
import {LoginService} from './services/login.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { VaultComponent } from './vault/vault.component';
import {VaultService} from './services/vault.service';
import { SafePipe } from './pipes/safe.pipe';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VaultComponent,
    LoadingSpinnerComponent,
    SafePipe,
    CopyToClipboardDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    ClipboardModule
  ],
  providers: [
    LoginService,
    VaultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
