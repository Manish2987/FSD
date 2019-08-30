import { browser, by, element, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class DashboardViewPage {

    // constructor(private authService: AuthenticationService){
    //     this.authService.loggedIn = true;
    // }


    // navigate to dashboard view page
    navigateToDashboardView() {
        this.loginIntoApplication();
        return browser.get('/home');
    }

    // get headlines section 
    getHeadlinesSection(): ElementFinder {
        return element(by.tagName("section[id='headlines']"));
    }

    // check headlines section is present or not
    isHeadlinesSectionPresent(): promise.Promise<boolean> {
        return this.getHeadlinesSection().isPresent();
    }

    // get category section 
    getCategorySection(): ElementFinder {
        return element(by.tagName("section[id='category']"));
    }

    // check headlines section is present or not
    isCategorySectionPresent(): promise.Promise<boolean> {
        return this.getCategorySection().isPresent();
    }

    // get category drop down
    getCategoryDropDown(): ElementFinder {
        return element(by.tagName("select[name='category-drop-down']"));
    }

    // check category drop down is present or not
    isCategoryDropDownPresent(): promise.Promise<boolean> {
        return this.getCategoryDropDown().isPresent();
    }   

    // get selected value of category drop down
    getCategoryDropDownSelectedText(){
        return this.getCategoryDropDown().getText();
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