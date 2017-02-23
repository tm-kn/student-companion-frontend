import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { Place } from './place';
import { PlaceCategory } from './placeCategory';
import { User } from './user';

@Injectable()
export class CompanionService {
  private baseUrl = AppConfig.API_ENDPOINT;
  private placesUrl = this.baseUrl + 'places/';
  private categoriesUrl = this.baseUrl + 'place-categories/';
  private authenticateUrl = this.baseUrl + 'api-token-auth/';

  constructor(private http: Http) {}

  authenticate(username: string, password: string): Observable<User> {
    return this.http.post(
                      this.authenticateUrl,
                      { email: username, password },
                      this.getOptions()
                    )
                    .map((response: Response) => {
                      localStorage.setItem('token', response.json()['token']);
                      return response.json()['user'];
                    })
                    .catch(this.handleError);
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get(this.placesUrl, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get(this.placesUrl + id + '/', this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCategories(): Observable<PlaceCategory[]> {
    return this.http.get(this.categoriesUrl, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCategory(id: number): Observable<PlaceCategory> {
    return this.http.get(this.categoriesUrl + id + '/', this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  postPlace(
    placeId: string,
    studentDiscount: string,
    categories: number[],
    description: string
  ): Observable<Place> {
    return this.http.post(this.placesUrl, {
                      google_places_id: placeId,
                      student_discount: studentDiscount,
                      categories: categories,
                      description: description
                    }, this.getOptions())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  search(searchString: string): Observable<Place[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('search_string', searchString);

    return this.http.get(this.placesUrl, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private getHeaders(): Headers {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.getToken();

    if (token) {
      headers['Authorization'] = 'JWT ' + token;
    }

    return new Headers(headers);
  }

  private getToken(): string {
    const token = localStorage.getItem('token');

    if (token) {
      return token;
    }

    return undefined;
  }

  private getOptions(): RequestOptions {
    const options = new RequestOptions({ headers: this.getHeaders() });
    console.log(options);
    return options;
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
