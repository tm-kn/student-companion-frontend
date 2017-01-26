import { Component, AfterViewInit } from '@angular/core';

import './rxjs-operators';

declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).foundation();
  }
}
