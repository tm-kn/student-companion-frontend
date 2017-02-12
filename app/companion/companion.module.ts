import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, } from '@angular/router';

import { CompanionNavigationComponent } from './companionNavigation.component';
import { DashboardComponent } from './dashboard.component';
import { CompanionService } from './companion.service';
import { PlaceComponent } from './place.component';
import { PlaceCategoryComponent } from './placeCategory.component';
import { PlaceCardComponent } from './placeCard.component';
import { SearchComponent } from './search.component';
import { SubmitPlaceComponent } from './submitPlace.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
        path: 'submit-place',
        component: SubmitPlaceComponent
      },
      {
        path: 'search/:searchString',
        component: SearchComponent
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
    PlaceCategoryComponent,
    SearchComponent,
    SubmitPlaceComponent
  ],
  providers: [
    CompanionService
  ]
})
export class CompanionModule { }
