import { NgtestPage } from './app.po';

describe('ngtest App', () => {
  let page: NgtestPage;

  beforeEach(() => {
    page = new NgtestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
