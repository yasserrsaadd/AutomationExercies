import { test, expect } from '@playwright/test';
import { LoginSignupPage } from '../pages/LoginSignupPage';
import users from '../fixtures/users.json';
import { generateRandomEmail, generateRandomName } from '../utils/testHelpers';

test.describe('Authentication', () => {

   test('TC1: Register User', async ({ page }) => {
    const loginPage = new LoginSignupPage(page);

    await loginPage.goto();
    await loginPage.startSignup(generateRandomName(), generateRandomEmail());
    await loginPage.completeSignup(users.newAccountDetails);

    await expect(loginPage.accountCreatedMessage).toBeVisible();
  });

  test('TC2: Login with correct email and password', async ({ page }) => {
    const loginPage = new LoginSignupPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.email, users.validUser.password);

    await expect(page.getByText('Logged in as')).toBeVisible();
  });

  test('TC3: Login with incorrect email and password', async ({ page }) => {
    const loginPage = new LoginSignupPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('TC4: Logout User', async ({ page }) => {
  const loginPage = new LoginSignupPage(page);

  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/');

  await loginPage.goto();
  await expect(page.getByText('Login to your account')).toBeVisible();

  await loginPage.login(users.validUser.email, users.validUser.password);
  await expect(page.getByText('Logged in as')).toBeVisible();

  await loginPage.logout();
  await expect(page.getByText('Login to your account')).toBeVisible();
});

test('TC5: Register User with existing email', async ({ page }) => {
  const loginPage = new LoginSignupPage(page);

  // Steps 1-3: navigate to home, verify it loaded
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/');

  // Step 4-5: go to login page, verify "New User Signup!" is visible
  await loginPage.goto();
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // Steps 6-7: enter name + already-registered email, click Signup
  await loginPage.startSignup(generateRandomName(), users.existingEmail.email);

  // Step 8: verify error message
  await expect(loginPage.signupErrorMessage).toBeVisible();
});

});