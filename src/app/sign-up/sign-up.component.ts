import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4)]);

  get emailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Email cannot be blank.';
    } else if (this.email.hasError('email')) {
      return 'Email is not a valid email address.';
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
