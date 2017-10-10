import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {AbstractForm} from './abstract-form';
import {NoConnection} from '../common/errors';

/**
 * AsyncValidator function for TestFormComponent::asyncControl1.
 * @returns {Observable<any>}
 */
function asyncValidator1() {
  return Observable.of(null);
}

/**
 * AsyncValidator function for TestFormComponent::asyncControl3.
 * @returns {Observable<any>}
 */
function asyncValidator3() {
  return Observable.of(null);
}

/**
 * Test class extending SUT
 * (needed because SUT is an abstract class).
 */
class TestFormComponent extends AbstractForm {
  formGroup: FormGroup;

  asyncControl1: FormControl;
  syncControl2: FormControl;
  asyncControl3: FormControl;

  constructor() {
    super();

    this.asyncControl1 = new FormControl('', null, asyncValidator1);
    this.syncControl2 = new FormControl('', Validators.required);
    this.asyncControl3 = new FormControl('', Validators.required, asyncValidator3);

    this.formGroup.addControl('asyncControl1', this.asyncControl1);
    this.formGroup.addControl('syncControl2', this.syncControl2);
    this.formGroup.addControl('asyncControl3', this.asyncControl3);
  }

  onSubmitSuccess() {}
}


describe('AbstractForm', () => {

  let component: TestFormComponent;

  beforeEach(() => {
    component = new TestFormComponent();
  });

  describe('#handleError()', () => {
    it(
      `should set formGroup.serverError on NoConnection error`,
      () => {
        // exec
        component.handleError(new NoConnection());
        // assert
        expect(component.formGroup.hasError('serverError')).toBe(true);
      }
    );
    it(
      `shouldn't set formGroup.clientError on NoConnection error`,
      () => {
        // exec
        component.handleError(new NoConnection());
        // assert
        expect(component.formGroup.hasError('clientError')).toBe(false);
      }
    );
    it(
      `should set formGroup.clientError on default error`,
      () => {
        // exec
        component.handleError(new Error());
        // assert
        expect(component.formGroup.hasError('clientError')).toBe(true);
      }
    );
    it(
      `shouldn't set formGroup.serverError on default error`,
      () => {
        // exec
        component.handleError(new Error());
        // assert
        expect(component.formGroup.hasError('serverError')).toBe(false);
      }
    );
    it(
      `should clear all async validators of the controls`,
      () => {
        // exec
        component.handleError(new Error());
        // assert
        expect(component.asyncControl1.asyncValidator).toBe(null);
        expect(component.asyncControl3.asyncValidator).toBe(null);
      }
    );
  });

  describe('#onSubmit()', () => {
    it(
      `should mark all form controls as touched`,
      () => {
        // exec
        component.onSubmit();
        // assert
        expect(component.asyncControl1.touched).toBe(true);
        expect(component.syncControl2.touched).toBe(true);
        expect(component.asyncControl3.touched).toBe(true);
      }
    );
    it(
      `shouldn't call onSubmitSuccess() if the form is invalid`,
      () => {
        // init
        spyOn(component, 'onSubmitSuccess');
        // exec
        component.onSubmit();
        // assert
        expect(component.onSubmitSuccess).toHaveBeenCalledTimes(0);
      }
    );
    it(
      `shouldn't call onSubmitSuccess() if the form is pending`,
      () => {
        // init
        spyOn(component, 'onSubmitSuccess');
        component.formGroup.markAsPending();
        // exec
        component.onSubmit();
        // assert
        expect(component.onSubmitSuccess).toHaveBeenCalledTimes(0);
      }
    );
    it(
      `should mark the form as pending if the form is valid`,
      () => {
        // init
        component.asyncControl1.setValue(1);
        component.syncControl2.setValue(2);
        component.asyncControl3.setValue(3);
        // exec
        component.onSubmit();
        // assert
        expect(component.formGroup.pending).toBe(true);
      }
    );
    it(
      `should call onSubmitSuccess() if the form is valid`,
      () => {
        // init
        component.asyncControl1.setValue(1);
        component.syncControl2.setValue(2);
        component.asyncControl3.setValue(3);
        spyOn(component, 'onSubmitSuccess');
        // exec
        component.onSubmit();
        // assert
        expect(component.onSubmitSuccess).toHaveBeenCalledTimes(1);
      }
    );
  });

});
