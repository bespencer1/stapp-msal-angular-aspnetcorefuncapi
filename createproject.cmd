REM create the new angular project using standalone with routing
ng new msal-aspnetcoreapi --routing true --style css

REM convert to standalone
ng g @angular/core:standalone

REM create Azure spa files
swa init --yes

REM add "apiLocation": "/api", to swa-cli.config.json

REM Microsoft Authentication Library for Browser based SPA
REM https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v3-samples
ng add @azure/msal-browser
REM Microsoft Authentication Library for Angular
ng add @azure/msal-angular

REM data service
ng generate service /data
ng generate service /config

REM components
ng generate component home  --standalone
ng generate component loginerror  --standalone
ng generate component signout  --standalone

REM auth-config to setup MSAL configuration
ng generate class auth-config

