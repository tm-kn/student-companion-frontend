import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CompanionService } from './companion.service';
import { Place } from './place';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  places: Place[];

  constructor(private service : CompanionService) {}

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces() {
    this.service.getPlaces()
                .subscribe(
                  places => this.places = places,
                  error => this.errorMessage = <any>error);
  }
}
