import { RestaurentAppPage } from './app.po';

describe('restaurent-app App', () => {
  let page: RestaurentAppPage;

  beforeEach(() => {
    page = new RestaurentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
