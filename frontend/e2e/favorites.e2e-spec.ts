import { FavoritesViewPage } from './page-objects/favorites.po';
import { browser } from 'protractor';

describe('favorite page', () => {
    let page: FavoritesViewPage;    

    beforeEach(() => {
        page = new FavoritesViewPage();
        
    });

    it('Favorites section should exist', () => {
        page.navigateToFavoritesdView ();        
        expect(page.isFavoritesSectionPresent()).toBeTruthy('Favorites section should exist');
    });  

    
    it('page should have news-cards', () => {
        page.navigateToFavoritesdView ();        
        expect(page.isNewsCardPresent()).toBeTruthy('Favorites section should exist');
    });


    it('news card should have favorite button enabled', () => {        
        page.navigateToFavoritesdView ();        
        expect(page.isFavoriteButtonSelected()).toBeTruthy('news card should have favorite button selected');
    });
    
    it('news card should have title', () => {
        page.navigateToFavoritesdView ();        
        expect(page.isNewsTitlePresent()).toBeTruthy('news card should have title');
    });

    
    it('news card should have Description', () => {
        page.navigateToFavoritesdView ();        
        expect(page.isNewsDescPresent()).toBeTruthy('news card should have description');
    });

    
    it('news card should have image', () => {
        page.navigateToFavoritesdView ();        
        expect(page.isNewsImagePresent()).toBeTruthy('news card should have image');
    });
});