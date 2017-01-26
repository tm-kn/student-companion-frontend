import { Component } from '@angular/core';

import { CompanionService } from './companion.service';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private service : CompanionService) {}
}
