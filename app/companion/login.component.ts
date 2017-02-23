import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CompanionService } from './companion.service';
import { User } from './user';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html',
  selector: 'login'
})
export class LoginComponent {
  errorMessage: any;
  username: string;
  password: string;

  constructor(private router: Router, private service: CompanionService) {}

  isValid() {
    if (this.username && this.password) {
      return true;
    }

    return false;
  }

  onSubmit() {
    if(!this.isValid()) {
      this.errorMessage = 'Fields cannot be empty';
      return;
    }

    this.errorMessage = '';

    this.service.authenticate(this.username, this.password)
                .subscribe(
                  (user) => {
                    console.log(user);
                    this.router.navigate(['/']);
                  },
                  (error) => this.errorMessage = <any> error
                );
  }
}
