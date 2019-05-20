import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheName: string;

  constructor() {
    this.cacheName = 'ngsw:1:data:dynamic:from-api:cache';
  }

  clearCache(url: string): Promise<any> {
    return this.clearCacheByUrl(this.cacheName, url);
  }

  private clearCacheByUrl(cacheName: string, url: string): Promise<any> {
    return caches.open(cacheName)
      .then(cache => {
        const keys = cache.keys();
        return keys.then(requests => requests.filter(request => request.url === url))
          .then(requestsToDelete => requestsToDelete.forEach(request => cache.delete(request.url)));
      });
  }
}