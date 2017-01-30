import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { CompanionService } from './companion.service';
import { PlaceCategory } from './placeCategory';

@Component({
  moduleId: module.id,
  templateUrl: './placeCategory.component.html',
  selector: 'place-category'
})
export class PlaceCategoryComponent implements OnInit {
  category: PlaceCategory;

  constructor(
    private service: CompanionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.service.getCategory(+params['id']))
    .subscribe(category => this.category = category);
  }
}
