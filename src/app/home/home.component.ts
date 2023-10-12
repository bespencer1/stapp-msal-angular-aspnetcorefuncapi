import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, filter} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//MS Auth
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { DataService, IMyData } from '../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginDisplay = false;
  claims: any =[];
  protected readonly _destroying$ = new Subject<void>();
  protected myData: IMyData[] = [];

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
    , private msalBroadcastService: MsalBroadcastService
    , private authService: MsalService
    , private dataService: DataService
    )
  {

  }

  ngOnInit() {

    this.authService.handleRedirectObservable().subscribe();

    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.setLoginDisplay();      
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims as Record<string, any>)  
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount(){
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }


  loginPopup() {
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

  logoutUser(){
    this.authService.logoutRedirect();
  }

  getClaims(claims: Record<string, any>) {
    if (claims) {
      Object.entries(claims).forEach((claim: [string, unknown], index: number) => {
        this.claims.push({id: index, claim: claim[0], value: claim[1]});
      });
    }
  }

  getData(){
    this.dataService.getData().subscribe(data => this.myData = data);
  }

  getAuthData(){
    this.dataService.getAuthData().subscribe(data => this.myData = data);
  }

}
