import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, ConnectableObservable, Subscriber } from 'rxjs';
import { multicast, tap } from 'rxjs/operators';

declare global {
  interface Window { onAmazonLoginReady: any; amazon: any; }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: String;
  private profile: Profile;
  public loggedIn: ConnectableObservable<boolean>;
  private subscriber: Subscriber<boolean>;

  constructor() { 
    const obs = new Observable<boolean>((observable) => {
      this.subscriber = observable;
    });
    this.loggedIn = obs.pipe(multicast(() => new Subject())) as ConnectableObservable<boolean>;
    this.loggedIn.connect();
  }

  public init() {
    window.amazon.Login.setClientId(environment.clientId);
  }

  public login() {
    const options = { scope : 'profile' };
    window.amazon.Login.authorize(options, environment.oAuthRedirectURL);
  }

  public logout() {
    window.amazon.Login.logout();
    this.token = null;
    this.subscriber.next(false);
  }

  public handleLogin(queryParams: any) {
    this.token = queryParams.access_token;
    this.subscriber.next(!!this.token);
  }

  public retrieveProfile() : Observable<Profile> {
    const result = new Observable<Profile>((observer) => {
      if (this.profile) {
        observer.next(this.profile);
        observer.complete();
        return;
      }

      window.amazon.Login.retrieveProfile(this.token, (profileResponse: ProfileResponse) => {
        if (!profileResponse.success) {
          observer.error("Could not retrieve profile.");
          observer.complete();
          return;
        } 
        
        observer.next(profileResponse.profile);
        observer.complete();
      })
      return { unsubscribe() { } };
    })
    return result;
  }
}
