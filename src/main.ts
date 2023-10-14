import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { APPROUTES } from './app/app-routing';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient  } from '@angular/common/http';

// Import MSAL and MSAL browser libraries. 
//import { MsalService, MsalGuard, MsalBroadcastService, MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';

// Import the Azure AD B2C configuration 
//import { MSALInstanceFactory, MSALInterceptorConfigFactory, MSALGuardConfigFactory } from './app/auth-config';



bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        BrowserModule, 
        RouterModule.forRoot(APPROUTES),
      )
      , provideHttpClient()
      /*, provideHttpClient(withInterceptorsFromDi()),
        {
            //automatically acquires tokens for outgoing requests 
            //that use the Angular http client to known protected resources
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService*/
    ]
})
  .catch(err => console.error(err));
