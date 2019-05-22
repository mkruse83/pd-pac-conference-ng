import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Talk from '../entities/talk';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import Favorites from '../entities/favorites';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getFavoritesUrl(): string {
    return environment.apiBaseUrl + '/admin/favorites';
  }

  private getToggleFavoritesUrl(conferenceId: string): string {
    const partkey = conferenceId.split('|')[0];
    const sortkey = conferenceId.split('|')[1];
    return environment.apiBaseUrl + '/admin/favorites/' + escape(partkey) + '/' + escape(sortkey) + '/talk';
  }

  public getFavorites(): Observable<Favorites> {
    if (!this.auth.token) {
      throw new Error("cannot invoke without auth");
    }
    const options = {
      headers: {
        'X-Auth': this.auth.token
      }
    };
    return this.http.get(this.getFavoritesUrl(), options).pipe(
      map((result: any) => new Favorites(result.favorites)),
    );
  }

  public toggleFavoriteTalk(conferenceId: string, talk: Talk) {
    if (!this.auth.token) {
      throw new Error("cannot invoke without auth");
    }

    const options = {
      headers: {
        'X-Auth': this.auth.token
      }
    };

    const body = {
      ...talk
    };
    delete body.id;
    return this.http.post(this.getToggleFavoritesUrl(conferenceId), body, options);
  }
}
