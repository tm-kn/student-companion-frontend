import { Component, OnInit } from '@angular/core';

import { CompanionService } from './companion.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    template: `
        <h1>Logout</h1>
    `
})
export class LogoutComponent implements OnInit {
    constructor(private router: Router, private service: CompanionService) {}

    ngOnInit() {
        this.service.logout();
        this.router.navigate(['/'])
                   .then(() => location.reload());
    }
}