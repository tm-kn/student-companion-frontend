import { Component, Input, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { CompanionService } from './companion.service';
import { Place } from './place';
import { User } from './user';

@Component({
  moduleId: module.id,
  templateUrl: './place.component.html',
  selector: 'place'
})
export class PlaceComponent implements OnInit {
  place: Place;
  @Input() description: string;
  @Input() rating: number;
  errorMessage: any;
  user: User;
  isBookmarked: boolean;

  constructor(
    private service: CompanionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loadPlace();
  }

  loadPlace() {
    this.route.params
    .switchMap((params: Params) => this.service.getPlace(+params['id']))
    .subscribe(place => {
      this.place = place;
      this.loadUser();
    });
  }

  loadUser() {
    this.service.getCurrentUser()
                .subscribe((user) => {
                  this.user = user;
                  this.loadBookmarkedPlaces();
                });
  }

  loadBookmarkedPlaces() {
    this.service.getBookmarkedPlaces()
                .subscribe((places) => {
                  if (places.find((val) => val.id === this.place.id)) {
                    this.isBookmarked = true;
                  } else {
                    this.isBookmarked = false;
                  }
                });
  }

  onSubmit() {
    this.service.addPlaceRating(this.place.id, this.rating, this.description)
                .subscribe(
                  (placeRating) => {
                    this.loadPlace();
                  },
                  (error) => {
                    this.errorMessage = error;
                  }
                );
  }

  bookmark() {
    this.service.bookmarkPlace(this.place.id)
                .subscribe(
                  (user) => {
                    this.isBookmarked = true;
                    this.user  = user;
                  },
                  (error) => {
                    console.log(error);
                  }
                );
  }

  unbookmark() {
    this.service.unbookmarkPlace(this.place.id)
                .subscribe(
                  (user) => {
                    this.isBookmarked = false;
                    this.user = user;
                  },
                  (error) => {
                    console.log(error);
                  }
                );
  }
}
