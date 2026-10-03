import path from 'path';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Contact Us', () => {
  test('TC6: Contact Us Form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const filePath = path.resolve(__dirname, '../fixtures/test-file.pdf');

  await homePage.goto();
  await expect(page).toHaveURL('https://automationexercise.com/');

  await homePage.goToContactUs();
  await expect(contactPage.getInTouchHeading).toBeVisible();

  await contactPage.fillForm('Yasser Saad', 'testEmail@gmail.com', 'Test Subject', 'Test message body');
  await contactPage.uploadFile(filePath);
  await contactPage.submit(); // handles the confirm dialog and waits for the success alert

  await homePage.goto();
  await expect(page).toHaveURL('https://automationexercise.com/');
});

});