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
        const hasServerError = component.signUpForm.hasError('serverError');
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
        const hasClientError = component.signUpForm.hasError('clientError');
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

    it(`shouldn't call 'signUp() while the form is invalid`, () => {
      // init
      const stubService = {
        signUp: (email: string, password: string) => {}
      };
      const component = new SignUpComponent(stubService as AuthService);
      component.signUpForm.setErrors({ clientError: true });
      spyOn(stubService, 'signUp');
      // exec
      component.onSubmit();
      // assert
      expect(stubService.signUp).toHaveBeenCalledTimes(0);
    });

    it(`shouldn't call 'signUp() while the form is pending`, () => {
      // init
      const stubService = {
        signUp: (email: string, password: string) => {}
      };
      const component = new SignUpComponent(stubService as AuthService);
      component.signUpForm.markAsPending();
      spyOn(stubService, 'signUp');
      // exec
      component.onSubmit();
      // assert
      expect(stubService.signUp).toHaveBeenCalledTimes(0);
    });
  });

});
