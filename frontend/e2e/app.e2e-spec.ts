import { AppPage } from './page-objects/app.po';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });  

  it('should check header presentation on home page', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy('<mat-toolbar> should exist in header.component.html');
  });

  it('should display Header as 24X7 News', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('24X7 News');
  });

});
