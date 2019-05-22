import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearsService {

  private years = [
    new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0)),
    new Date(Date.UTC(2019, 0, 1, 0, 0, 0, 0)),
  ];

  constructor() { }

  /**
   * Get years. Maybe replaced with api call in the future.
   * (I did not use Observable.of so I could get to know Observables better)
   */
  public getYears(): Observable<Date> {
    return new Observable<Date>((observer) => {

      if (!this.years || this.years.length === 0) {
        observer.error('No years defined');
        return;
      }

      this.years.forEach((year) => {
        observer.next(year);
      });
      observer.complete();

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return { unsubscribe() { } };
    });
  }
}
