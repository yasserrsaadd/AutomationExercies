import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactUsLink = page.getByRole('link', { name: ' Contact us' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }
}