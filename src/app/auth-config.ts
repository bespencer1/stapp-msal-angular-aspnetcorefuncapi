import { LogLevel, Configuration, BrowserCacheLocation, InteractionType, PublicClientApplication, IPublicClientApplication } from '@azure/msal-browser';
import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '85cef18e-23df-4f98-8585-bb296d19b996',
            authority: 'https://cenonb2c.b2clogin.com/cenonb2c.onmicrosoft.com/b2c_1_signin',
            authorityDomain: 'cenonb2c.b2clogin.com'
        }
    },
    appURI: 'https://cenonb2c.onmicrosoft.com/85cef18e-23df-4f98-8585-bb296d19b996',
};

// MSAL Instance Configuration
// supply client ID, authority, and authoritydomain from configuration
// set redirect Uri
// set postLogoutRedirectUri
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId, //Group Travel SPA appID
      authority: environment.msalConfig.auth.authority,
      knownAuthorities: [environment.msalConfig.auth.authorityDomain],
      redirectUri: '/',
      navigateToLoginRequestUrl: false,
      postLogoutRedirectUri: '/signout'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback: (logLevel, message, containsPii) => {
          console.log(message);
        },
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

// MSAL HTTP Interceptor
// automatically acquires tokens for outgoing requests 
// that use the Angular http client to known protected resources
// add list of APIs that are protected to add token to
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map([
    [protectedResources.authDataApi.endpoint, protectedResources.authDataApi.scopes],
    [protectedResources.graphMe.endpoint, protectedResources.graphMe.scopes],
  ])

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

// MSAL Guard Configuration
// Set Interaction Type to Popup or Redirect
// Set authorization request scopes
// Set loginFailedRoute
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: [...protectedResources.authDataApi.scopes
        , ...protectedResources.graphMe.scopes]
    },
    loginFailedRoute: '/loginerror'
  };
}

// List of protected APIs
export const protectedResources = {
    dataApi: {
      endpoint: '/api/getData',
    },
    authDataApi: {
      endpoint: '/api/getAuthData',
      scopes: [environment.appURI + '/Groups.Read'],
    },
    graphMe: {
      endpoint: 'https://graph.microsoft.com/v1.0/me',
      scopes: [environment.appURI + '/User.Read'],
    },
  }