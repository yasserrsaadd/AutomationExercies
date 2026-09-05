import { test, expect, Browser, chromium, Page } from '@playwright/test';

test.describe.serial('Registeration', () => {

  let browser: Browser;
  let page: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  test('Register User', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('yasser');
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('yassersaad795@gmail.com');
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
    await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('yasser');
    await page.getByRole('textbox', { name: 'Name *', exact: true }).press('ArrowRight');
    await page.getByRole('textbox', { name: 'Password *' }).click();
    await page.getByRole('textbox', { name: 'Password *' }).fill('123456789');
    await page.locator('#days').selectOption('9');
    await page.locator('#months').selectOption('2');
    await page.locator('#years').selectOption('2002');
    await page.getByRole('textbox', { name: 'First name *' }).click();
    await page.getByRole('textbox', { name: 'First name *' }).fill('yasser');
    await page.getByRole('textbox', { name: 'Last name *' }).click();
    await page.getByRole('textbox', { name: 'Last name *' }).fill('saad');
    await page.getByRole('textbox', { name: 'Company', exact: true }).click();
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('expleo');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('new cairo');
    await page.getByLabel('Country *').selectOption('Canada');
    await page.getByRole('textbox', { name: 'State *' }).click();
    await page.getByRole('textbox', { name: 'State *' }).fill('cairo');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('cairo');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('1234');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('01090314697');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
  });

   
  });