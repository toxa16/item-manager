import {Component} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';

import {AuthService} from '../auth.service';
import {NoConnection} from '../../common/errors';
import {Observable} from 'rxjs/Observable';

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

  constructor(private authService: AuthService) {
    this.email.setAsyncValidators(this.checkEmailTaken.bind(this));

    /*this.signUpForm = new FormGroup({
      email: this.email,
      password: this.password,
    });*/

    //this.signUpForm.setValidators(this.clientErrorValidator.bind(this));
  }

  checkEmailTaken(control: AbstractControl): ValidationErrors|null {
    console.log(`validating check email for ${control.value}...`);
    return this.authService.checkEmail(this.email.value)
      .then(available => available ? null : { emailTaken: true },)
      .catch(err => {
        console.log(err);
        return { emailTaken: true };
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

    /*if (this.isFormValid) {
      alert('Signing up...');
    }*/
  }
}
