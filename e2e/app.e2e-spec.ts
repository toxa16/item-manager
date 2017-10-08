import { HomePage } from './home-page.po';
import {browser} from 'protractor';

describe('Item Manager Home Page', () => {

  it('should redirect to sign in page', () => {
    HomePage.navigateTo();
    expect(browser.getCurrentUrl()).toMatch(/\/sign-in$/);
  });

});
