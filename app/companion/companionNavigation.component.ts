import {
  // AfterViewInit,
  Component,
  // ElementRef,
  OnInit
} from '@angular/core';

import { PlaceCategory } from './placeCategory';
import { CompanionService } from './companion.service';

declare var $: any;

@Component({
  moduleId: module.id,
  templateUrl: './companionNavigation.component.html',
  selector: 'companion-navigation'
})
export class CompanionNavigationComponent implements
  // AfterViewInit,
  OnInit {
  categories: PlaceCategory[];
  errorMessage: string;
  parentCategories: PlaceCategory[];

  constructor(
    // private element: ElementRef,
    private service: CompanionService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  // ngAfterViewInit() {
  //   $(this.element.nativeElement.ownerDocument).foundation();
  // }

  getCategories() {
    this.service.getCategories()
                .subscribe(
                  categories => {
                    this.parentCategories = categories.filter(cat => !cat.parent);
                    this.categories = categories;
                  },
                  error => this.errorMessage = error
                );
  }
}
