import {Component} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent {
  email: FormControl = new FormControl('',
    [Validators.required, Validators.email]);
  password: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4)]);

  constructor() {}

  checkEmailTaken(control: AbstractControl): ValidationErrors|null {
    return Observable.of({ emailTaken: true }).delay(1500);
    //return Observable.of(null).delay(1500);
  }

  onEmailBlur() {
    this.email.markAsPending();
    this.email.setAsyncValidators(this.checkEmailTaken.bind(this));
    this.email.updateValueAndValidity();
  }

  onEmailFocus() {
    this.email.clearAsyncValidators();
  }

  get emailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Email cannot be blank.';
    } else if (this.email.hasError('email')) {
      return 'Email is not a valid email address.';
    } else if (this.email.hasError('emailTaken')) {
      return 'This email address has already been taken.';
    } else {
      return '';
    }
  }

  get passwordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Password cannot be blank.';
    } else if (this.password.hasError('minlength')) {
      return 'Password should be at least 4 characters long.';
    } else {
      return '';
    }
  }

  private get isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  onSubmit(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();

    if (this.isFormValid) {
      alert('Signing up...');
    }
  }
}
