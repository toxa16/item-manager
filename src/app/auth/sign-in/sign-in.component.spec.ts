import {Observable} from 'rxjs/Observable';
import {SignInComponent} from './sign-in.component';
import {AuthService} from '../auth.service';

describe('SignInComponent', () => {

  describe('#onSubmitSuccess()', () => {

    it(
      `should set formGroup.authenticate error 
      on AuthService.signUp() resolve = 'false'`,
      done => {
        // init
        const stubService = {
          signIn: (email: string, password: string): Observable<boolean> => {
            return Observable.of(false);
          }
        };
        const component = new SignInComponent(stubService as AuthService);
        component.email.setValue('uno@email.com');
        component.password.setValue('1111');
        // exec
        Observable.of(component.onSubmitSuccess()).subscribe(() => {
          // assert
          expect(component.formGroup.hasError('authenticate'))
            .toBe(true);
          done();
        });
      }
    );

    it(
      `should call handleError() on AuthService.signUp() reject`,
      done => {
        // init
        const stubService = {
          signIn: (email: string, password: string): Observable<boolean> => {
            return Observable.throw(new Error());
          }
        };
        const component = new SignInComponent(stubService as AuthService);
        component.email.setValue('uno@email.com');
        component.password.setValue('1111');
        spyOn(component, 'handleError');
        // exec
        Observable.of(component.onSubmitSuccess()).subscribe(() => {
          // assert
          expect(component.handleError).toHaveBeenCalled();
          done();
        });
      }
    );
  });
});
