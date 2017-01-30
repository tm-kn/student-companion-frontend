import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, } from '@angular/router';

import { CompanionNavigationComponent } from './companionNavigation.component';
import { DashboardComponent } from './dashboard.component';
import { CompanionService } from './companion.service';
import { PlaceComponent } from './place.component';
import { PlaceCategoryComponent } from './placeCategory.component';
import { PlaceCardComponent } from './placeCard.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: 'categories/:id/:slug',
        component: PlaceCategoryComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'places/:id/:slug',
        component: PlaceComponent
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
    PlaceComponent,
    PlaceCardComponent,
    PlaceCategoryComponent
  ],
  providers: [
    CompanionService
  ]
})
export class CompanionModule { }
