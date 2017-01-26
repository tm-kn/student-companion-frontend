import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, } from '@angular/router';

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
  declarations: [
    DashboardComponent,
    PlaceCardComponent
  ],
  providers: [
    CompanionService
  ]
})
export class CompanionModule { }
