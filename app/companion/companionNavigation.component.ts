import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


import { PlaceCategory } from './placeCategory';
import { CompanionService } from './companion.service';

declare var $: any;

@Component({
  moduleId: module.id,
  templateUrl: './companionNavigation.component.html',
  selector: 'companion-navigation'
})
export class CompanionNavigationComponent implements OnInit {
  categories: PlaceCategory[];
  errorMessage: string;
  parentCategories: PlaceCategory[];
  @Input() searchString: string;

  constructor(
    private router: Router,
    private service: CompanionService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.searchString = '';
  }

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

  onSubmitSearch() {
    if (this.searchString) {
      this.router.navigate(['/search', this.searchString]);
      this.searchString = '';
    }
  }
}
