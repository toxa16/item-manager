import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="form-group">
      <input [attr.type]="type" placeholder="{{ placeholder }}" class="form-control"
             [formControl]="formControl"
             [class.is-invalid]="formControl.touched && formControl.invalid"
             [class.is-pending]="formControl.pending"
             [class.is-valid]="formControl.touched && formControl.valid" 
             (blur)="blur.emit($event)" 
             (focus)="focus.emit($event)">
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
export class EmailInputComponent {
  @Input() errorMessage: string = '';
  @Input() formControl: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
}
