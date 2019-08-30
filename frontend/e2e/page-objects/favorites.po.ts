import { browser, by, element, ElementFinder, promise } from 'protractor';

export class FavoritesViewPage {

    // navigate to favorites view page
    navigateToFavoritesdView() {
        this.loginIntoApplication();
        this.navigateToHome();
        this.getAddToFavoritesButton().click();
        return browser.get('/favorites');
    }

    navigateToHome() {
        return browser.get('/home');
    }

    // get favorites section 
    getFavoritesSection(): ElementFinder {
        return element(by.tagName("section[id='favorites']"));
    }

    // check favorites section is present or not
    isFavoritesSectionPresent(): promise.Promise<boolean> {
        return this.getFavoritesSection().isPresent();
    }

    // get news card component
    getNewsCardComponent(): ElementFinder {
        return element.all(by.tagName('app-news-card')).first();
    }

     // check if news card present or not
    isNewsCardPresent(): promise.Promise<boolean> {
        return this.getNewsCardComponent().isPresent();
    }

    // get button
    getFavoritesButton(): ElementFinder {
        return this.getNewsCardComponent().element(by.css('.unfavorite-btn'));
    }
    
    getAddToFavoritesButton(): ElementFinder {
        return this.getNewsCardComponent().element(by.css('.favorite-btn'));
    }

    isFavoriteButtonSelected(): promise.Promise<boolean> {
        return this.getFavoritesButton().isPresent();
    }

    // get button
    getNewsTitle(): ElementFinder {
        return this.getNewsCardComponent().element(by.css('.news-title'));
    }

    isNewsTitlePresent(): promise.Promise<boolean> {
        return this.getNewsTitle().isPresent();
    }

    getNewsDescription(): ElementFinder {
        return this.getNewsCardComponent().element(by.css('.news-text'));
    }

    isNewsDescPresent(): promise.Promise<boolean> {
        return this.getNewsDescription().isPresent();
    }

    getNewsImage(): ElementFinder {
        return this.getNewsCardComponent().element(by.name('news-poster'));
    }

    isNewsImagePresent(): promise.Promise<boolean> {
        return this.getNewsImage().isPresent();
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