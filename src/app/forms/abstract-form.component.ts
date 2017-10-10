import {FormGroup, ValidationErrors} from '@angular/forms';
import {NoConnection} from '../common/errors';

export abstract class AbstractFormComponent {
  public abstract formGroup: FormGroup;

  private clientError = false;
  private serverError = false;

  constructor() {
    this.formGroup = new FormGroup({});
    this.formGroup.setValidators([
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
   * Service error handler.
   * @param {Error} err
   */
  protected handleError(err: Error): void {
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
}
