import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { CompanionService } from './companion.service';
import { Place } from './place';

@Component({
  moduleId: module.id,
  templateUrl: './search.component.html',
  selector: 'place-search'
})
export class SearchComponent implements OnInit {
  searchResults: Place[];
  searchString: string;

  constructor(
    private service: CompanionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // this.searchString = this.route.snapshot.params['searchString'];

    this.route.params
        .switchMap((params: Params) => {
          this.searchString = params['searchString'];
          return this.service.search(params['searchString']);
        })
        .subscribe(searchResults => this.searchResults = searchResults);
  }
}
