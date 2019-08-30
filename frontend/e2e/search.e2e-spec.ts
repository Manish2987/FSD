import { SearchViewPage } from './page-objects/Search.po';
import { browser } from 'protractor';

describe('Search Result page', () => {
    let page: SearchViewPage;    

    beforeEach(() => {
        page = new SearchViewPage();
        
    });

    it(' Search section should exist', () => {
        page.navigateToSearchdView ();        
        expect(page.isSearchSectionPresent()).toBeTruthy('Search section should exist');
    }); 
    
    it(' Search textbox should exist', () => {
        page.navigateToSearchdView ();        
        expect(page.isSearchTextBoxPresent()).toBeTruthy('Search textbox should exist');
    }); 

    it(' Search button should exist', () => {
        page.navigateToSearchdView ();        
        expect(page.isSearchButtonPresent()).toBeTruthy('Search button should exist');
    }); 

    it(' Clicking on Search button should navigate to search results', () => {
        page.navigateToSearchdView ();   
        page.getSearchTextBox().sendKeys('cricket');
        page.getSearchButton().click();
        browser.waitForAngular();
        let currUrl : String;
        browser.getCurrentUrl().then((url)=>{
            currUrl = url;
            //console.log(currUrl);
            expect(currUrl).toContain('search/cricket');
          });        
    }); 


    
    it('page should have news-cards', () => {
        page.navigateToSearchdView ();        
        expect(page.isNewsCardPresent()).toBeTruthy('Search section should exist');
    });


    it('news card should have add to favorite button ', () => {
        page.navigateToSearchdView ();        
        expect(page.isAddToFavoriteButtonPresent()).toBeTruthy('news card should have add to favorite button');
    });

    it('news card should be added to favorite on click of button', () => {
        page.navigateToSearchdView ();        
        page.getAddToFavoriteButton().click();

        expect(page.isRemoveFromFavoriteButtonPresent()).toBeTruthy('news should be added to favorite on click of favorite button');
    });
    
    it('news card should have title', () => {
        page.navigateToSearchdView ();        
        expect(page.isNewsTitlePresent()).toBeTruthy('news card should have title');
    });

    
    it('news card should have Description', () => {
        page.navigateToSearchdView ();        
        expect(page.isNewsDescPresent()).toBeTruthy('news card should have description');
    });

    
    it('news card should have image', () => {
        page.navigateToSearchdView ();        
        expect(page.isNewsImagePresent()).toBeTruthy('news card should have image');
    });
});