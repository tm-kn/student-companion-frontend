import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CompanionService } from './companion.service';
import { Place } from './place';
import { User } from './user';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  bookmarkedPlaces: Place[];
  places: Place[];
  user: User;

  constructor(private service: CompanionService) {
    this.bookmarkedPlaces = [];
  }

  ngOnInit() {
    this.getPlaces();
    this.getUser();
  }

  getUser() {
    this.service.getCurrentUser()
                .subscribe(
                  user => {
                    this.user = user;
                    this.getBookmarkedPlaces()
                  },
                  error => console.log(error)
                );
  }

  getBookmarkedPlaces() {
    this.service.getBookmarkedPlaces()
                .subscribe(
                  places => this.bookmarkedPlaces = places,
                  error => console.log(error)
                );
  }

  getPlaces() {
    this.service.getPlaces()
                .subscribe(
                  places => this.places = places,
                  error => this.errorMessage = <any>error);
  }
}
