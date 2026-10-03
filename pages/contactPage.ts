import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;

  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly chooseFileButton: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('.status.alert.alert-success');
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.chooseFileButton.setInputFiles(filePath);
  }

  async submit() {
    // The site binds its confirm-and-submit handler through jQuery. If it has not loaded,
    // the browser performs a native POST and reloads the form instead of showing success.
    await this.page.waitForFunction(() => {
      const form = document.querySelector('#contact-us-form');
      const jquery = (window as any).jQuery;
      return Boolean(form && jquery?._data(form, 'events')?.submit?.length);
    });

    // Start waiting for both the dialog and success state before clicking. The success
    // message can be rendered as part of the submit flow, before click() finishes.
    const dialogHandled = this.page
      .waitForEvent('dialog')
      .then(dialog => dialog.accept());

    await Promise.all([
      this.submitButton.click(),
      dialogHandled,
      expect(this.successMessage).toContainText(/submitted successfully/i, { timeout: 15000 }),
    ]);
  }
}
