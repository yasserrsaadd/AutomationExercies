import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactUsLink = page.getByRole('link', { name: ' Contact us' });
    this.testCasesLink = page.locator('header').getByRole('link', { name: 'Test Cases' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }

  async goToTestCases() {
    await this.testCasesLink.click();
  }
}