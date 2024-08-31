import { BasePage } from "../BasePage.ts";

export default class LoginPage extends BasePage {
  selectors: {
    usernameInput: string; passwordInput: string; loginButton: string; userAvatarIcon: string; userMenuContainer: string; logoutButton: string; // Adjusted to use a different CSS selector
    notificationContainer: string; loginSuccessfulMessage: string;
  };
  constructor() {
    super();
    // Selectors for elements on the login page
    this.selectors = {
      usernameInput: 'input[name="login"]',
      passwordInput: 'input[name="password"]',
      loginButton: '[class*="loginForm__login-button"] button',
      userAvatarIcon: '[class*="userBlock__avatar-wrapper"]',
      userMenuContainer: '[class*="userBlock__menu"]',
      logoutButton: 'button:contains("Logout")', // Adjusted to use a different CSS selector
      notificationContainer: '.notification-transition-enter-done p',
      loginSuccessfulMessage: '[class*="notificationItem__success"]'
    };
  }

  // Method to navigate to the login page
  navigateToLoginPage() {
    this.navigateTo('/#login');
  }

  // Method to perform login action
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  // Method to perform logout action
  logout() {
    cy.get(this.selectors.userAvatarIcon).click();
    cy.get(this.selectors.userMenuContainer).find(this.selectors.logoutButton).click();
  }

  // Method to enter username
  enterUsername(username) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  // Method to enter password
  enterPassword(password) {
    cy.get(this.selectors.passwordInput).clear().type(password);
  }

  // Method to click the login button
  clickLoginButton() {
    cy.get(this.selectors.loginButton).should('exist').click();
  }

  // Method to get notification container message text
  getNotificationContainerMessage() {
    return cy.get(this.selectors.notificationContainer).invoke('text');
  }

  // Method to verify if the error message is displayed
  isErrorMessageDisplayed() {
    return cy.get(this.selectors.notificationContainer).should('be.visible');
  }

  // Method to verify if the successful login message is displayed
  isSuccessfulLoginMessageDisplayed() {
    return cy.get(this.selectors.loginSuccessfulMessage).should('be.visible');
  }
}
