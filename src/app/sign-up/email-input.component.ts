import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-email-input',
  template: `
    <div class="form-group">
      <input type="email" placeholder="Email" class="form-control"
             [formControl]="formControl"
             [class.is-invalid]="formControl.touched && formControl.invalid"
             [class.is-pending]="formControl.pending"
             [class.is-valid]="formControl.touched && formControl.valid">
      <div *ngIf="formControl.touched && formControl.invalid" class="invalid-feedback">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class EmailInputComponent {
  @Input() formControl: FormControl;
  @Input() errorMessage: string;
}
