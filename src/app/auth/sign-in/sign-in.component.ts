import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AbstractForm} from '../../forms/abstract-form';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: 'sign-in.component.html'
})
export class SignInComponent extends AbstractForm {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern(/^[\x21-\x7e]+$/),
  ]);

  formGroup: FormGroup;

  constructor(private authService: AuthService) {
    super();
    this.formGroup.addControl('email', this.email);
    this.formGroup.addControl('password', this.password);
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
    } else if (this.password.hasError('pattern')) {
      return 'Password should contain only Latin letters, ' +
        'digits and punctuation characters.';
    } else if (this.password.hasError('minlength')) {
      return 'Password should be at least 4 characters long.';
    } else {
      return '';
    }
  }

  onSubmitSuccess() {
    this.authService.signUp(this.email.value, this.password.value).subscribe(
      success => {
        if (!success) {
          this.formGroup.setErrors({ authenticate: true });
        }
      },
      this.handleError.bind(this),
    );
    //this.formGroup.setErrors({ authenticate: true });
  }
}
