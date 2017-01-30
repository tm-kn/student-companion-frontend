import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, } from '@angular/router';

import { CompanionNavigationComponent } from './companionNavigation.component';
import { DashboardComponent } from './dashboard.component';
import { CompanionService } from './companion.service';
import { PlaceCardComponent } from './placeCard.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
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
  exports: [
    CompanionNavigationComponent
  ],
  declarations: [
    CompanionNavigationComponent,
    DashboardComponent,
    PlaceCardComponent
  ],
  providers: [
    CompanionService
  ]
})
export class CompanionModule { }
