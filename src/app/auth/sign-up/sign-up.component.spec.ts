import {Observable} from 'rxjs/Observable';
import {NoConnection} from '../../common/errors';
import {AuthService} from '../auth.service';
import {SignUpComponent} from './sign-up.component';
import has = Reflect.has;

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

});
