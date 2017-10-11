/**
 * @copyright 2017 Anton Bakhurynskyi
 * @license MIT
 * @see https://github.com/toxa16/item-manager
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncValidatorFn, FormControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="form-group">
      <input [attr.type]="type" placeholder="{{ placeholder }}" class="form-control"
             [formControl]="formControl"
             [class.is-invalid]="formControl.touched && formControl.invalid"
             [class.is-pending]="formControl.pending"
             [class.is-valid]="formControl.touched && formControl.valid" 
             (blur)="onBlur()" 
             (focus)="onFocus()">
      <i class="pending-indicator fa fa-spinner fa-pulse"></i>
      <div class="invalid-feedback" 
           *ngIf="formControl.touched && formControl.invalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .pending-indicator {
      display: none;
    }

    .form-group {
      position: relative;
    }

    .is-pending+.pending-indicator {
      position: absolute;
      top: 0.65rem;
      right: 0.65rem;
      display: inline;
    }
  `],
})
export class InputComponent {
  @Input() errorMessage: string = '';
  @Input() formControl: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  // TODO: test behavior
  private asyncValidator: AsyncValidatorFn|null;

  // TODO: test behavior
  private onBlur(): void {
    this.formControl.markAsPending();
    this.formControl.setAsyncValidators(this.asyncValidator);
    this.formControl.updateValueAndValidity();
  }

  // TODO: test behavior
  private onFocus(): void {
    this.asyncValidator = this.formControl.asyncValidator;
    this.formControl.clearAsyncValidators();
  }
}
