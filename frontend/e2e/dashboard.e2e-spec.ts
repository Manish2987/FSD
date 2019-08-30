import { DashboardViewPage } from './page-objects/dashboard.po';
import { browser } from 'protractor';

describe('dashboard page', () => {
    let page: DashboardViewPage;    

    beforeEach(() => {
        page = new DashboardViewPage();
        
    });

    it(' Headlines news section should exist', () => {
        page.navigateToDashboardView();        
        expect(page.isHeadlinesSectionPresent()).toBeTruthy('Headlines section should exist');
    });

    
    it(' Category news section should exist', () => {
        page.navigateToDashboardView();
        expect(page.isCategorySectionPresent()).toBeTruthy('Category section should exist');
    });

    
    it(' Category drop down should exist', () => {
        page.navigateToDashboardView();
        expect(page.isCategoryDropDownPresent()).toBeTruthy('Category drop down should exist');
    });
    
    it(' Category drop down should have default category as General', () => {
        page.navigateToDashboardView();
//        browser.sleep(55000);
        expect(page.getCategoryDropDownSelectedText()).toContain('General');
    });
    
});