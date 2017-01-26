import { Component, OnInit } from '@angular/core';

import './rxjs-operators';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent{}
