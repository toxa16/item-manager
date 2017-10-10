import {Observable} from 'rxjs/Observable';
import {NoConnection} from '../../common/errors';
import {AuthService} from '../auth.service';
import {SignUpComponent} from './sign-up.component';

describe('SignUpComponent', () => {

  describe('#checkEmailTaken()', () => {
    it(`should set signUpForm.serverError on NoConnection error`, done => {
      const stubService = {
        checkEmail: (email: string): Observable<boolean> => {
          return Observable.throw(new NoConnection());
        }
      } as AuthService;
      const component = new SignUpComponent(stubService);

      component.checkEmailTaken().subscribe(() => {
        const hasServerError = component.formGroup.hasError('serverError');
        expect(hasServerError).toBe(true);
        done();
      });
    });

    it(`should set signUpForm.clientError on random error`, done => {
      const stubService = {
        checkEmail: (email: string): Observable<boolean> => {
          return Observable.throw(-1);
        }
      } as AuthService;
      const component = new SignUpComponent(stubService);

      component.checkEmailTaken().subscribe(() => {
        const hasClientError = component.formGroup.hasError('clientError');
        expect(hasClientError).toBe(true);
        done();
      });
    });

    it(
      `should return { emailTaken: true } error on 'false' response`,
      done => {
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.of(false);
          }
        } as AuthService;
        const component = new SignUpComponent(stubService);

        component.checkEmailTaken().subscribe(errors => {
          expect(errors['emailTaken']).toBe(true);
          done();
        });
      }
    );

    it(
      `should return null on 'true' response`,
      done => {
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.of(true);
          }
        } as AuthService;
        const component = new SignUpComponent(stubService);

        component.checkEmailTaken().subscribe(errors => {
          expect(errors).toBe(null);
          done();
        });
      }
    );

    it(`should clear email async validator on reject`, done => {
      const stubService = {
        checkEmail: (email: string): Observable<boolean> => {
          return Observable.throw(0);
        }
      } as AuthService;
      const component = new SignUpComponent(stubService);

      component.checkEmailTaken().subscribe(() => {
        expect(component.email.asyncValidator).toBe(null);
        done();
      });
    });
  });

  describe('#onSubmit()', () => {
    it(`should mark all form fields as touched`, () => {
      // init
      const stubService = {
        signUp: (email: string, password: string) => {}
      };
      const component = new SignUpComponent(stubService as AuthService);
      // exec
      component.onSubmit();
      // assert
      expect(component.email.touched).toBe(true,
        'email should be marked as touched');
      expect(component.password.touched).toBe(true,
        'password should be marked as touched');
    });

    it(`shouldn't call signUp() while the form is invalid`, () => {
      // init
      const stubService = {
        signUp: (email: string, password: string) => {}
      };
      const component = new SignUpComponent(stubService as AuthService);
      component.formGroup.setErrors({ clientError: true });
      spyOn(stubService, 'signUp');
      // exec
      component.onSubmit();
      // assert
      expect(stubService.signUp).toHaveBeenCalledTimes(0);
    });

    it(`shouldn't call signUp() while the form is pending`, () => {
      // init
      const stubService = {
        signUp: (email: string, password: string) => {}
      };
      const component = new SignUpComponent(stubService as AuthService);
      component.formGroup.markAsPending();
      spyOn(stubService, 'signUp');
      // exec
      component.onSubmit();
      // assert
      expect(stubService.signUp).toHaveBeenCalledTimes(0);
    });

    it(
      `should mark signUpForm as pending once called validly`,
      () => {
        // init
        const stubService = {
          signUp: (email: string, password: string) => Observable.of(null)
        };
        const component = new SignUpComponent(stubService as AuthService);
        component.email.clearAsyncValidators();
        component.email.setValue('four@email.com');
        component.password.setValue('4444');
        // exec
        component.onSubmit();
        expect(component.formGroup.pending).toBe(true);
      }
    );

    it(
      `should set form.serverError on NoConnection error`,
      done => {
        // init
        const stubService = {
          signUp: (email: string, password: string): Observable<null> => {
            return Observable.throw(new NoConnection());
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        component.email.clearAsyncValidators();
        component.email.setValue('four@email.com');
        component.password.setValue('4444');
        // exec
        Observable.of(component.onSubmit()).subscribe(() => {
          // assert
          const hasServerError = component.formGroup.hasError('serverError');
          expect(hasServerError).toBe(true);
          done();
        });
      }
    );

    it(
      `should set form.clientError on random error`,
      done => {
        // init
        const stubService = {
          signUp: (email: string, password: string): Observable<null> => {
            return Observable.throw(1);
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        component.email.clearAsyncValidators();
        component.email.setValue('four@email.com');
        component.password.setValue('4444');
        // exec
        Observable.of(component.onSubmit()).subscribe(() => {
          // assert
          const hasClientError = component.formGroup.hasError('clientError');
          expect(hasClientError).toBe(true);
          done();
        });
      }
    );

    it(
      `should clear email async validator on signUp() reject`,
      done => {
        // init
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.of(true);
          },
          signUp: (email: string, password: string): Observable<null> => {
            return Observable.throw(new Error());
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        //component.email.clearAsyncValidators();
        component.email.setValue('four@email.com');
        component.password.setValue('4444');
        // exec
        Observable.of(component.onSubmit()).subscribe(() => {
          // assert
          expect(component.email.asyncValidator).toBe(null);
          done();
        });
      }
    );
  });

});
