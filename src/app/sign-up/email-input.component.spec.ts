import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {EmailInputComponent} from './email-input.component';



describe(`EmailInputComponent`, () => {

  let component: EmailInputComponent;
  let fixture: ComponentFixture<EmailInputComponent>;
  const mockControl = new FormControl('', [Validators.required, Validators.email]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailInputComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
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
    const errorMessage = 'Email is not a valid email address';

    beforeEach(() => {
      mockControl.setValue('email'); // invalid = true
      mockControl.markAsTouched(); // touched = true

      component.formControl = mockControl;
      component.errorMessage = errorMessage;
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

  describe('for pending touched .form-control', () => {
    beforeEach(() => {
      mockControl.setValue('email@email.com');
      mockControl.markAsPending();  // pending = true
      mockControl.markAsTouched();  // touched = true

      component.formControl = mockControl;
      fixture.detectChanges();
    });

    it(`shouldn't append .is-invalid CSS class`);
    it(`shouldn't append .is-valid CSS class`);
    it(`should append .is-pending CSS class`);
    it(`shouldn't display .invalid-feedback element`);
  });

});
