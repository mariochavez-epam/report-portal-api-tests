const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
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

    open() {
        return super.open('/#login');
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
        const saomeText =  await notification.getText();
        return notification.getText();
      }
    
      async isErrorMessageDisplayed() {
        const errorMessage = $(this.selectors.notificationContainer);
        await errorMessage.waitForDisplayed();
        return !errorMessage.isDisplayed();
      }
    
      async isSuccessfulLoginMessageDisplayed() {
        const successMessage = $(this.selectors.loginSuccessfulMessage);
        await successMessage.waitForDisplayed();
        return successMessage.isDisplayed();
      }
}

module.exports = new LoginPage();
