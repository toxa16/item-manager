import {Observable} from 'rxjs/Observable';

import {AuthService} from '../auth.service';
import {SignUpComponent} from './sign-up.component';

describe('SignUpComponent', () => {

  describe('#checkEmailTaken()', () => {
    it(
      `should return '{ emailTaken: true }' 
      on AuthService.checkEmail() response = 'false'`,
      done => {
        // init
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.of(false);
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        // exec
        component.checkEmailTaken().subscribe(errors => {
          // assert
          expect(errors['emailTaken']).toBe(true);
          done();
        });
      }
    );

    it(
      `should return 'null' on AuthService.checkEmail() response = 'true'`,
      done => {
        // init
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.of(true);
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        // exec
        component.checkEmailTaken().subscribe(errors => {
          // assert
          expect(errors).toBe(null);
          done();
        });
      }
    );

    it(
      `should call handleError() on AuthService.checkEmail() reject`,
      done => {
        // init
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.throw(new Error());
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        spyOn(component, 'handleError');
        // exec
        component.checkEmailTaken().subscribe(() => {
          // assert
          expect(component.handleError).toHaveBeenCalled();
          done();
        });
      }
    );

    it(
      `should return null on AuthService.checkEmail() reject`,
      done => {
        // init
        const stubService = {
          checkEmail: (email: string): Observable<boolean> => {
            return Observable.throw(new Error());
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        // exec
        component.checkEmailTaken().subscribe(errors => {
          expect(errors).toBe(null);
          done();
        });
      }
    );
  });

  describe('#onSubmitSuccess()', () => {
    it(
      `should call handleError() on AuthService.signUp() reject`,
      done => {
        // init
        const stubService = {
          signUp: (email: string, password: string): Observable<null> => {
            return Observable.throw(new Error());
          }
        };
        const component = new SignUpComponent(stubService as AuthService);
        // for testing purposes:
        // async validators aren't significant for current test case
        component.email.clearAsyncValidators();
        component.email.setValue('four@email.com');
        component.password.setValue('4444');
        spyOn(component, 'handleError');
        // exec
        Observable.of(component.onSubmitSuccess()).subscribe(
          () => {
            // assert
            expect(component.handleError).toHaveBeenCalled();
            done();
          }
        );
      }
    );
  });

});
