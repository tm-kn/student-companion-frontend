import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { Place } from './place';

@Injectable()
export class CompanionService {
  private baseUrl = AppConfig.API_ENDPOINT;
  private placesUrl = this.baseUrl + 'places/';

  constructor(private http: Http) {}

  getPlaces(): Observable<Place[]> {
    return this.http.get(this.placesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
