import { Component, Input } from '@angular/core';

import { Place } from './place';

@Component({
  moduleId: module.id,
  templateUrl: './placeCard.component.html',
  selector: 'place-card'
}) export class PlaceCardComponent {
  @Input() place: Place;
}
