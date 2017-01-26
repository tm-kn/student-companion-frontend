import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { CompanionModule } from './companion/companion.module'

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/companion/companion.module#CompanionModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports:      [
    BrowserModule,
    CompanionModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
