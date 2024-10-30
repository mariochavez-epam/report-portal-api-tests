import { BasePage } from "../BasePage.ts";
import { $ } from '@wdio/globals';
import { browser } from '@wdio/globals';

class LoginPage extends BasePage {
  selectors: { usernameInput: string; passwordInput: string; loginButton: string; userAvatarIcon: string; userMenuContainer: string; logoutButton: string; notificationContainer: string; loginSuccessfulMessage: string; };
  constructor() {
    super();
    this.selectors = {
      usernameInput: 'input[name="login"]',
      passwordInput: 'input[name="password"]',
      loginButton: '[class*="loginForm__login-button"] button',
      userAvatarIcon: '[class*="userBlock__avatar-wrapper"]',
      userMenuContainer: '[class*="userBlock__menu"]',
      logoutButton: 'button*=Logout',
      notificationContainer: '.notification-transition-enter-done p',
      loginSuccessfulMessage: '[class*="notificationItem__success"]'
    };
  }

  async navigateToLoginPage() {
    await this.navigateTo('/#login');
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async logout() {
    await $(this.selectors.userAvatarIcon).click();
    await $(`${this.selectors.userMenuContainer} ${this.selectors.logoutButton}`).click();
  }

  async enterUsername(username) {
    const usernameInput = $(this.selectors.usernameInput);
    await usernameInput.waitForExist();
    await usernameInput.clearValue();
    await usernameInput.setValue(username);
  }

  async enterPassword(password) {
    const passwordInput = $(this.selectors.passwordInput);
    await passwordInput.waitForExist();
    await passwordInput.clearValue();
    await passwordInput.setValue(password);
  }

  async clickLoginButton() {
    const loginButton = $(this.selectors.loginButton);
    await loginButton.waitForExist();
    await loginButton.click();
  }

  async getNotificationContainerMessage() {
    const notification = $(this.selectors.notificationContainer);
    await notification.waitForDisplayed();
    return notification.getText();
  }

  async isErrorMessageDisplayed() {
    const errorMessage = $(this.selectors.notificationContainer);
    await errorMessage.waitForDisplayed();
    return errorMessage.isDisplayed();
  }

  async isSuccessfulLoginMessageDisplayed() {
    const successMessage = $(this.selectors.loginSuccessfulMessage);
    await successMessage.waitForDisplayed();
    return successMessage.isDisplayed(); 
  }
}

const loginPage = new LoginPage();
export default loginPage;