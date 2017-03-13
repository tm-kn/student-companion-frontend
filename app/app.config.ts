import { isDevMode } from '@angular/core';

export class AppConfig {
  public static API_ENDPOINT = isDevMode() ? 'http://localhost:8000/' : 'http://django.sc.tmkn.uk/'
  public static LOCATION_LATITUDE = 53.6458;
  public static LOCATION_LONGITUDE = -1.7850;
}
