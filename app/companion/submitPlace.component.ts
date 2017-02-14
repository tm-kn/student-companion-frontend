
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfig } from '../app.config';
import { CompanionService } from './companion.service';
import { Place } from './place';
import { PlaceCategory } from './placeCategory';

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'submit-place',
  templateUrl: './submitPlace.component.html'
})
export class SubmitPlaceComponent {
  attemptedSearch: boolean;
  categories: PlaceCategory[];
  createdPlace: Place;
  description: string;
  selectedCategories: number[];
  errorMessage: any;
  currentPlace: any;
  loading: boolean;
  places: any;
  submitButtonDisabled: boolean;
  private service: any;
  private location: any;
  private infoWindow: any;
  private map: any;
  private markers: any;
  @ViewChild('map') mapElement: any;
  @Input() placeSearchInput: string;
  @Input() studentDiscountInformation: string;

  constructor(private companionService: CompanionService, private router: Router) {
    this.attemptedSearch = false;
    this.loading = false;
    this.markers = [];
    this.places = [];
    this.selectedCategories = [];
    this.studentDiscountInformation = '';
    this.submitButtonDisabled = false
  }

  ngOnInit() {
    this.loadMap();

    this.companionService.getCategories()
                         .subscribe(
                           categories => this.categories = categories,
                           error => this.errorMessage = <any>error
                         );
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
      this.loading = false;

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          const place = results[i];
          this.places.push(place);
        }
      }
    });
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

  isValid(): boolean {
    if (!this.currentPlace) {
      return false;
    }

    return true;
  }

  submitPlace() {
    const valid: boolean = this.isValid();

    if (!valid) {
      return;
    }

    this.submitButtonDisabled = true;
    this.errorMessage = '';
    
    this.companionService.postPlace(
                           this.currentPlace.place_id,
                           this.studentDiscountInformation,
                           this.selectedCategories,
                           this.description
                         )
                         .subscribe(
                           place  => {
                             this.createdPlace = place;
                             this.router.navigate(['/place-submitted', place.id]);
                           },
                           error =>  {
                             this.errorMessage = <any>error;
                             this.submitButtonDisabled = false;
                           });
  }
}
