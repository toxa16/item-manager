import {browser, by, element} from 'protractor';

describe('Sign Up Page', () => {

  it('should contain Sign Up Page contents', () => {
    browser.get('/sign-up');
    const contents = element(by.id('signUpPage'));
    expect(contents.isPresent()).toBe(true);
  });
});
