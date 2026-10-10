import path from 'path';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Miscellaneous Tests', () => {
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

test('TC7: Verify Test Cases Page', async ({ page }) => {
  const homePage = new HomePage(page);

  // Steps 1-3: navigate to home, verify it loaded
  await homePage.goto();
  await expect(page).toHaveURL('https://automationexercise.com/');

  // Step 4: click Test Cases
  await homePage.goToTestCases();

  // Step 5: verify we landed on the test cases page
await expect(page).toHaveURL(/\/test_cases(#google_vignette)?$/);
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
});

});