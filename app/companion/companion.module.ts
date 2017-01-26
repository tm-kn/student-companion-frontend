import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CompanionService } from './companion.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    CompanionService
  ]
})
export class CompanionModule { }
