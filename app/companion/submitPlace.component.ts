
import { Component, Input, ViewChild } from '@angular/core';

import { AppConfig } from '../app.config';

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'submit-place',
  templateUrl: './submitPlace.component.html'
})
export class SubmitPlaceComponent {
  attemptedSearch: boolean;
  currentPlace: any;
  loading: boolean;
  places: any;
  private service: any;
  private location: any;
  private infoWindow: any;
  private map: any;
  private markers: any;
  @ViewChild('map') mapElement: any;
  @Input() placeSearchInput: string;

  constructor() {
    this.attemptedSearch = false;
    this.markers = [];
    this.loading = false;
    this.places = [];
  }

  ngOnInit() {
    this.loadMap();
  }

  searchPlaces() {
    this.currentPlace = null;
    this.attemptedSearch = true;
    this.cleanMarkers();
    this.cleanPlaces();

    const request = {
      location: this.location,
      radius: '500',
      name: this.placeSearchInput
    };

    this.loading = true;

    this.service.nearbySearch(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          const place = results[i];
          this.places.push(place);
        }
      }
    });

    this.loading = false;
  }

  setPlace(place: any) {
    this.cleanMarkers();
    this.currentPlace = place;

    this.map.setCenter(place.geometry.location);

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    this.infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');

    this.infoWindow.open(this.map, marker);
    this.markers.push(marker);
  }

  private loadMap() {
    this.location = new google.maps.LatLng(AppConfig.LOCATION_LATITUDE, AppConfig.LOCATION_LONGITUDE);

    this.infoWindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.location,
      clickableIcons: false,
      zoom: 17
    });
    this.service = new google.maps.places.PlacesService(this.map);
  }

  private cleanMarkers() {
    this.markers.forEach((marker: any) => {
      marker.setMap(null);
      marker = null;
    });
  }

  private cleanPlaces() {
    this.places = [];
  }
}
