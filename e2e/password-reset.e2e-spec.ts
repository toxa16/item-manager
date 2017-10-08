import {browser, by, element} from 'protractor';

describe('Sign Up Page', () => {

  it('should contain Password Reset Page contents', () => {
    browser.get('/password-reset');
    const contents = element(by.id('passwordResetPage'));
    expect(contents.isPresent()).toBe(true);
  });
});
