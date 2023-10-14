import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { LoginerrorComponent } from './loginerror/loginerror.component';
import { SignoutComponent } from './signout/signout.component';

export const APPROUTES: Routes = [
  {
    // The home component
    path: '',
    component: HomeComponent,
  },
  {
    // The home component
    path: 'data',
    component: HomeComponent,
  },
  {
    path: 'loginerror',
    component: LoginerrorComponent
  },
  {
    path: 'signout',
    component: SignoutComponent
  },
];
