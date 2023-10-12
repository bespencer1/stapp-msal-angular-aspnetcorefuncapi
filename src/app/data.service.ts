import { Injectable } from '@angular/core';
import { Observable, of, catchError, EMPTY, ReplaySubject, BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { protectedResources } from './auth-config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private mydata: Observable<IMyData[]> = of([]); 

  constructor(private http: HttpClient) { }

  getData(): Observable<IMyData[]> {
    this.mydata = this.http.get<any[]>(protectedResources.dataApi.endpoint).pipe(shareReplay(1));
    return this.mydata;
  }

  getAuthData(): Observable<IMyData[]> {
    this.mydata = this.http.get<any[]>(protectedResources.authDataApi.endpoint).pipe(shareReplay(1));
    return this.mydata;
  }
}

export interface IMyData {
    name: string,
    value?: string,
    email?: string
}