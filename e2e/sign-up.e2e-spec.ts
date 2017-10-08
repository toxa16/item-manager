import {browser, by, element} from 'protractor';

describe('Sign Up Page', () => {

  beforeEach(() => {
    browser.get('/sign-up');
  });

  it('should contain Sign Up Page contents', () => {
    const contents = element(by.id('signUpPage'));
    expect(contents.isPresent()).toBe(true);
  });

  it('should redirect to Sign In Page on #signInLink click', () => {
    const signUpLink = element(by.id('signInLink'));
    signUpLink.click();
    expect(browser.getCurrentUrl()).toContain('/sign-in');
  });
});
