import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  navigateTo() {
    this.loginIntoApplication();
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-brand')).getText();
  }

   // get header
   getHeader(): ElementFinder {
    return element(by.tagName('mat-toolbar'));
  }
  // check header is present or not
  isHeaderPresent(): promise.Promise<boolean> {
    return this.getHeader().isPresent();
  }

  // Login into application - start

  loginIntoApplication() {
    this.navigateToLogin();
    this.addLoginValues();        
    this.clickSubmitButton();
    browser.waitForAngular();        
};

navigateToLogin() {
    return browser.get('/login');
}

// get login component
getloginComponent(): ElementFinder {
    return element(by.tagName('app-login'));
}

// get username input box
getUserNameInputBox(): ElementFinder {
    return element(by.className('username'));
}

// get password input box
getPasswordInputBox(): ElementFinder {
    return element(by.className('password'));
}

// get submit button
getSubmitButton(): ElementFinder {
    return this.getloginComponent().element(by.buttonText('Login'));
}

// click submit button
clickSubmitButton(): promise.Promise<void> {
    return this.getSubmitButton().click();
}    

// get username and password details
getMockLoginDetail(): any {
    const loginDetail: any = { username: 'admin', password: 'admin' };
    return loginDetail;
}
// set username and password input box values
addLoginValues(): any {
    const login: any = this.getMockLoginDetail();
    this.getUserNameInputBox().sendKeys(login.username);
    this.getPasswordInputBox().sendKeys(login.password);
    return Object.keys(login).map(key => login[key]);
}

//login ends
}
