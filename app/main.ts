import {  enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

if (!/localhost/.test(document.location.host)) {
  // enableProdMode();
  console.log('production');
}

platformBrowserDynamic().bootstrapModule(AppModule);
