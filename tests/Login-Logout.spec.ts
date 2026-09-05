import { test, expect, chromium, Browser, Page } from '@playwright/test';
test.describe.serial('Login and Logout Flow', () => {

  let browser: Browser;
  let page: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  test('Login User', async () => {
  await page.goto('https://automationexercise.com/login');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('yassersaad795@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Cart' })).toBeVisible();
  });


test('Logout User', async () => {
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
});

});





   