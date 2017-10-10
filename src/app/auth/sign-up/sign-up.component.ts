import {Component} from '@angular/core';
import {
  FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../auth.service';
import {NoConnection} from '../../common/errors';

@Component({
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern(/^[\x21-\x7e]+$/),
  ]);

  signUpForm: FormGroup;
  private clientError = false;
  private serverError = false;

  constructor(private authService: AuthService) {
    this.email.setAsyncValidators(this.checkEmailTaken.bind(this));

    this.signUpForm = new FormGroup({
      email: this.email,
      password: this.password,
    });

    this.signUpForm.setValidators([
      this.clientErrorValidator.bind(this),
      this.serverErrorValidator.bind(this),
    ]);
  }

  /**
   * ClientError validator.
   * @returns {ValidationErrors}
   */
  private clientErrorValidator(): ValidationErrors|null {
    return this.clientError ? { clientError: true } : null;
  }

  /**
   * ServerError validator.
   * @returns {ValidationErrors}
   */
  private serverErrorValidator(): ValidationErrors|null {
    return this.serverError ? { serverError: true } : null;
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


  /*private get isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }*/

  onSubmit(): void {
    this.email.markAsTouched();
    this.password.markAsTouched();

    if (this.signUpForm.valid) {
      this.signUpForm.markAsPending();
      this.authService.signUp(this.email.value, this.password.value)
        .subscribe(
          () => {},
          this.handleError.bind(this)
        );
    }
  }

  /**
   * Service error handler.
   * @param {Error} err
   */
  private handleError(err: Error): void {
    if (err instanceof NoConnection) {
      this.serverError = true;
    } else {
      this.clientError = true;
    }
    this.signUpForm.updateValueAndValidity();
    this.email.clearAsyncValidators();
  }

}
