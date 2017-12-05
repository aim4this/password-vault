import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {VaultComponent} from './vault/vault.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const APP_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'vault', component: VaultComponent}
];
export const Routing = RouterModule.forRoot(APP_ROUTES);
