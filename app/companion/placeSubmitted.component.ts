import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  templateUrl: './placeSubmitted.component.html',
  selector: 'place-submitted'
})
export class PlaceSubmittedComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
  }
}
