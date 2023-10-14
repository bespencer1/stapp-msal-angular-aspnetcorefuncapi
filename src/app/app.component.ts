import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Subject, filter} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//MS Auth
//import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
//import { InteractionStatus, RedirectRequest, AuthenticationResult, PopupRequest } from '@azure/msal-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink]
})
export class AppComponent { //implements OnInit, OnDestroy
  title = 'msal-aspnetcoreapi';

  /*protected loginDisplay = false;
  protected userName = '';
  protected claims: any =[];
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
    , private msalBroadcastService: MsalBroadcastService
    , private authService: MsalService
    )
  {

  }

  ngOnInit() {

    //this.authService.handleRedirectObservable().subscribe();

    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.setLoginDisplay();      
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }  

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    if (this.loginDisplay) {  
      let activeAccount = this.authService.instance.getActiveAccount();
      this.userName = this.authService.instance.getActiveAccount()!.name!;
    }
    else {
      this.userName = 'No active account';
    }
  }

  checkAndSetActiveAccount(){
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }


  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(){
    this.authService.logoutRedirect();
  }
  */
}
