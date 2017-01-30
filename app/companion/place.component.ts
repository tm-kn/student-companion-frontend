import { Component, Input } from '@angular/core';

import { Place } from './place';

@Component({
  moduleId: module.id,
  templateUrl: './place.component.html',
  selector: 'place'
}) export class PlaceComponent {
  @Input() category: Place;
}
