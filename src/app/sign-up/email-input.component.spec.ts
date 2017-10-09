import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {EmailInputComponent} from './email-input.component';

describe(`EmailInputComponent`, () => {

  let component: EmailInputComponent;
  let fixture: ComponentFixture<EmailInputComponent>;
  const mockControl = new FormControl('', [Validators.required, Validators.email]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailInputComponent],
      imports: [FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(EmailInputComponent);
    component = fixture.componentInstance;
  });

  describe(`for invalid untouched .form-control`, () => {
    beforeEach(() => {
      mockControl.setValue(''); // invalid = true
      mockControl.markAsUntouched(); // touched = false

      component.formControl = mockControl;
      fixture.detectChanges();
    });
    it(`shouldn't append .is-invalid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsInvalidClass = input.classList.contains('is-invalid');
      expect(hasIsInvalidClass).toBe(false);
    });
    it(`shouldn't append .is-valid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsValidClass = input.classList.contains('is-valid');
      expect(hasIsValidClass).toBe(false);
    });
    it(`shouldn't append .is-pending CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsPendingClass = input.classList.contains('is-pending');
      expect(hasIsPendingClass).toBe(false);
    });
    it(`shouldn't display .invalid-feedback element`, () => {
      const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
      expect(feedback).toBeFalsy();
    });
  });

  describe(`for valid untouched .form-control`, () => {
    beforeEach(() => {
      mockControl.setValue('email@email.com'); // valid = true
      mockControl.markAsUntouched(); // touched = false

      component.formControl = mockControl;
      fixture.detectChanges();
    });
    it(`shouldn't append .is-invalid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsInvalidClass = input.classList.contains('is-invalid');
      expect(hasIsInvalidClass).toBe(false);
    });
    it(`shouldn't append .is-valid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsValidClass = input.classList.contains('is-valid');
      expect(hasIsValidClass).toBe(false);
    });
    it(`shouldn't append .is-pending CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsPendingClass = input.classList.contains('is-pending');
      expect(hasIsPendingClass).toBe(false);
    });
    it(`shouldn't display .invalid-feedback element`, () => {
      const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
      expect(feedback).toBeFalsy();
    });
  });

  describe(`for invalid touched .form-control`, () => {
    beforeEach(() => {
      mockControl.setValue('email'); // invalid = true
      mockControl.markAsTouched(); // touched = true

      component.formControl = mockControl;
      fixture.detectChanges();
    });
    it(`should append .is-invalid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsInvalidClass = input.classList.contains('is-invalid');
      expect(hasIsInvalidClass).toBe(true);
    });
    it(`shouldn't append .is-valid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsValidClass = input.classList.contains('is-valid');
      expect(hasIsValidClass).toBe(false);
    });
    it(`shouldn't append .is-pending CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsPendingClass = input.classList.contains('is-pending');
      expect(hasIsPendingClass).toBe(false);
    });
    it(`should display .invalid-feedback element`, () => {
      const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
      expect(feedback).toBeTruthy();
    });
    it(
      `should display an error message in .invalid-feedback`,
      () => {
        const errorMessage = 'Email is not a valid email address';
        component.errorMessage = errorMessage;
        fixture.detectChanges();
        const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
        expect(feedback.innerHTML.trim()).toBe(errorMessage);
      });
  });

  describe(`for valid touched .form-control`, () => {
    beforeEach(() => {
      mockControl.setValue('email@email.com'); // valid = true
      mockControl.markAsTouched(); // touched = true

      component.formControl = mockControl;
      fixture.detectChanges();
    });
    it(`shouldn't append .is-invalid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsInvalidClass = input.classList.contains('is-invalid');
      expect(hasIsInvalidClass).toBe(false);
    });
    it(`should append .is-valid CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsValidClass = input.classList.contains('is-valid');
      expect(hasIsValidClass).toBe(true);
    });
    it(`shouldn't append .is-pending CSS class`, () => {
      const input = fixture.nativeElement.querySelector('input');
      const hasIsPendingClass = input.classList.contains('is-pending');
      expect(hasIsPendingClass).toBe(false);
    });
    it(`shouldn't display .invalid-feedback element`, () => {
      const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
      expect(feedback).toBeFalsy();
    });
  });

  describe('for pending .form-control', () => {
    beforeEach(() => {
      component.formControl = mockControl;
      fixture.detectChanges();
    });
    it(`shouldn't append .is-invalid CSS class`, () => {
      mockControl.markAsPending();  // pending = true
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('is-invalid')).toBe(false);
    });
    it(`shouldn't append .is-valid CSS class`, () => {
      mockControl.markAsPending();  // pending = true
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('is-valid')).toBe(false);
    });
    it(`should append .is-pending CSS class`, () => {
      mockControl.markAsPending();  // pending = true
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('is-pending')).toBe(true);
    });
    it(`shouldn't display .invalid-feedback element`, () => {
      mockControl.markAsPending();  // pending = true
      fixture.detectChanges();
      const feedback = fixture.nativeElement.querySelector('.invalid-feedback');
      expect(feedback).toBeFalsy();
    });
  });

});
