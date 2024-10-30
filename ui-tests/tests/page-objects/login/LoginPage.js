const BasePage = require("../BasePage.js");

const { $, browser } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
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

  navigateToLoginPage() {
    this.navigateTo('/#login');
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  logout() {
    $(this.selectors.userAvatarIcon).click();
    $(`${this.selectors.userMenuContainer} ${this.selectors.logoutButton}`).click();
  }

  enterUsername(username) {
    const usernameInput = $(this.selectors.usernameInput);
    usernameInput.waitForExist();
    usernameInput.clearValue();
    usernameInput.setValue(username);
  }

  enterPassword(password) {
    const passwordInput = $(this.selectors.passwordInput);
    passwordInput.waitForExist();
    passwordInput.clearValue();
    passwordInput.setValue(password);
  }

  clickLoginButton() {
    const loginButton = $(this.selectors.loginButton);
    loginButton.waitForExist();
    loginButton.click();
  }

  getNotificationContainerMessage() {
    const notification = $(this.selectors.notificationContainer);
    notification.waitForDisplayed();
    return notification.getText();
  }

  isErrorMessageDisplayed() {
    const errorMessage = $(this.selectors.notificationContainer);
    errorMessage.waitForDisplayed();
    return errorMessage.isDisplayed();
  }

  isSuccessfulLoginMessageDisplayed() {
    const successMessage = $(this.selectors.loginSuccessfulMessage);
    successMessage.waitForDisplayed();
    return successMessage.isDisplayed();
  }
}
module.exports = new LoginPage();