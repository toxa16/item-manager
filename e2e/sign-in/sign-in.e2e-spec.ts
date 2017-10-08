import {browser, by, element} from 'protractor';

describe('Sign In Page', () => {

  it('should contain Sign In Page contents', () => {
    browser.get('/sign-in');
    expect(element(by.id('signInPage')).isPresent()).toBe(true);
  });

  it('should redirect to Sign Up Page on #signUpLink click', () => {
    browser.get('/sign-in');
    const signUpLink = element(by.id('signUpLink'));
    signUpLink.click();
    expect(browser.getCurrentUrl()).toContain('/sign-up');
  });

  it(
    'should redirect to Password Reset Page on #passwordResetLink click',
    () => {
      browser.get('/sign-in');
      const signUpLink = element(by.id('passwordResetLink'));
      signUpLink.click();
      expect(browser.getCurrentUrl()).toContain('/password-reset');
    }
  );
});
