import { browser, by, element } from 'protractor';

export class HomePage {
  static navigateTo() {
    return browser.get('/');
  }
}
