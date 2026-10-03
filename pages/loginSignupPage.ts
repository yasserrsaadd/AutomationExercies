import { Page, Locator } from '@playwright/test';

//loginSignupPage class to handle login and signup actions
export class LoginSignupPage {
  //locators for login elements
  readonly page: Page;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
 

  // locators for signup elements
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  // locators for account creation elements
  readonly titleMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;

  // locator for logout link
   readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    //login locators
    this.loginEmailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.loginPasswordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');

    // Signup mini-form
    this.signupNameInput = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.signupErrorMessage = page.getByText('Email Address already exist!');

    // Full account details form
    this.titleMrRadio = page.getByRole('radio', { name: 'Mr.' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.countrySelect = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedMessage = page.getByText('Account Created!');

    // Logout link
    this.logoutLink = page.getByRole('link', { name: ' Logout' }); // ✅ verified, note leading space

  }



  async goto() {
    await this.page.goto('/login');
  }
  //login method to perform login action
  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  //signup method to perform signup action
   async startSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async completeSignup(details: {
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.day);
    await this.monthsSelect.selectOption(details.month);
    await this.yearsSelect.selectOption(details.year);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
    await this.createAccountButton.click();
  }

  //logout method to perform logout action
  async logout() {
  await this.logoutLink.click();
}
}
