import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { CompanionService } from './companion.service';
import { Place } from './place';

@Component({
  moduleId: module.id,
  templateUrl: './place.component.html',
  selector: 'place'
})
export class PlaceComponent implements OnInit {
  place: Place;

  constructor(
    private service: CompanionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.service.getPlace(+params['id']))
    .subscribe(place => this.place = place);
  }
}
