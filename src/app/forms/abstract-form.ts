import {FormGroup, ValidationErrors} from '@angular/forms';
import {NoConnection} from '../common/errors';

export abstract class AbstractForm {

  /**
   * Primary-role form model.
   */
  public abstract formGroup: FormGroup;

  /**
   * `clientError` validator flag.
   * @type {boolean}
   */
  private clientError = false;

  /**
   * `serverError` validator flag.
   * @type {boolean}
   */
  private serverError = false;

  constructor() {
    this.formGroup = new FormGroup({});
    this.formGroup.setValidators([
      this.clientErrorValidator.bind(this),
      this.serverErrorValidator.bind(this),
    ]);
  }

  /**
   * `clientError` validator.
   * @returns {ValidationErrors}
   */
  private clientErrorValidator(): ValidationErrors|null {
    return this.clientError ? { clientError: true } : null;
  }

  /**
   * `serverError` validator.
   * @returns {ValidationErrors}
   */
  private serverErrorValidator(): ValidationErrors|null {
    return this.serverError ? { serverError: true } : null;
  }

  /**
   * Service error handler.
   * To be used primarily to handle errors from Http services.
   * @param err
   */
  public handleError(err: any): void {
    if (err instanceof NoConnection) {
      this.serverError = true;
    } else {
      this.clientError = true;
    }
    this.formGroup.updateValueAndValidity();

    for (const control of Object.values(this.formGroup.controls)) {
      control.clearAsyncValidators();
    }
  }

  /**
   * Submit event listener of the primary form.
   * Verifies form validity before performing `onSubmitSuccess()` action.
   */
  public onSubmit(): void {
    for (const control of Object.values(this.formGroup.controls)) {
      control.markAsTouched();
    }
    if (this.formGroup.valid) {
      this.formGroup.markAsPending();
      this.onSubmitSuccess();
    }
  };

  /**
   * An action to be performed when valid form is submitted.
   */
  public abstract onSubmitSuccess(): void;
}
