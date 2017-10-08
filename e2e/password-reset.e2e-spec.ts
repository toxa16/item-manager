import {browser, by, element} from 'protractor';

describe('Password Reset Page', () => {

  beforeEach(() => {
    browser.get('/password-reset');
  });

  it('should contain Password Reset Page contents', () => {
    browser.get('/password-reset');
    const contents = element(by.id('passwordResetPage'));
    expect(contents.isPresent()).toBe(true);
  });

  it('should redirect to Sign In Page on #cancelLink click', () => {
    const signUpLink = element(by.id('cancelLink'));
    signUpLink.click();
    expect(browser.getCurrentUrl()).toContain('/sign-in');
  });
});
