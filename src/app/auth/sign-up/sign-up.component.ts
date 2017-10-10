import {Component} from '@angular/core';
import {
  FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../auth.service';
import {NoConnection} from '../../common/errors';
import {AbstractForm} from '../../forms/abstract-form';

@Component({
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent extends AbstractForm {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern(/^[\x21-\x7e]+$/),
  ]);

  formGroup: FormGroup;

  constructor(private authService: AuthService) {
    super();

    this.email.setAsyncValidators(this.checkEmailTaken.bind(this));

    this.formGroup.addControl('email', this.email);
    this.formGroup.addControl('password', this.password);
  }

  /**
   * EmailTaken validator.
   * @returns {Observable<ValidationErrors>}
   */
  checkEmailTaken(): Observable<ValidationErrors|null> {
    return this.authService.checkEmail(this.email.value)
      .map(available => {
        return available ? null : { emailTaken: true };
      })
      .catch(err => {
        this.handleError(err);
        return Observable.of(null);
      });
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

  onSubmitSuccess(): void {
    this.authService.signUp(this.email.value, this.password.value)
      .subscribe(
        () => {},
        this.handleError.bind(this)
      );
  }

}
