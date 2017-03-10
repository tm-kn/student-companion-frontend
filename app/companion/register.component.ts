import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CompanionService } from './companion.service';

@Component({
  moduleId: module.id,
  templateUrl: './register.component.html',
  selector: 'register'
})
export class RegisterComponent {
  errorMessage: any;
  email: string;
  password: string;
  first_name: string;
  last_name: string;

  constructor(private router: Router, private service: CompanionService) {}

  isValid() {
    if (this.email && this.password && this.first_name && this.last_name) {
      return true;
    }

    return false;
  }

  onSubmit() {
    if (!this.isValid()) {
      this.errorMessage = 'Fields cannot be empty';
      return;
    }

    this.errorMessage = '';

    this.service.register(this.email, this.password, this.first_name, this.last_name)
                .subscribe(
                  (user) => {
                    console.log(user);

                    this.service.authenticate(this.email, this.password)
                                .subscribe(
                                  (user) => {
                                    console.log(user);
                                    this.router.navigate(['/'])
                                               .then(() => location.reload());
                                  },
                                  (error) => this.errorMessage = <any> error
                                );
                  },
                  (error) => this.errorMessage = <any> error
                );
  }
}
