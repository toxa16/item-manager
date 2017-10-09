import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-email-input',
  template: `
    <div class="form-group">
      <input placeholder="Email" class="form-control"
             [formControl]="formControl"
             [class.is-invalid]="formControl.touched && formControl.invalid"
             [class.is-pending]="formControl.pending"
             [class.is-valid]="formControl.touched && formControl.valid" 
             (blur)="onBlur($event)" 
             (focus)="onFocus($event)">
      <i class="pending-indicator fa fa-spinner fa-pulse"></i>
      <div *ngIf="formControl.touched && formControl.invalid" class="invalid-feedback">
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
export class EmailInputComponent {
  @Input() formControl: FormControl;
  @Input() errorMessage: string;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  private onBlur($event) {
    this.blur.emit($event);
  }

  private onFocus($event) {
    this.focus.emit($event);
  }
}
