const testData = require("../../tests/config/config");
const testEnvironment = Cypress.env("TEST_ENVIRONMENT") || "local";

export abstract class BasePage {
  baseUrl: string;
  constructor() {
    console.log("testData[testEnvironment].BASE_URL");
    console.log(testData[testEnvironment].BASE_URL);
    this.baseUrl = testData[testEnvironment].BASE_URL;
  }

  // Get the base URL
  getBaseUrl() {
    return this.baseUrl;
  }

  // Navigate to a specific URL
  navigateTo(url) {
    console.log("navigating to");
    console.log(this.baseUrl + url);
    cy.visit(this.baseUrl + url);
  }

  // Wait for an element to be visible
  waitForElementVisible(selector, timeout = 5000) {
    cy.get(selector, { timeout }).should('be.visible');
  }

  // Wait for an element to be clickable (Cypress automatically handles visibility, but you can add additional checks if needed)
  waitForElementClickable(selector, timeout = 5000) {
    cy.get(selector, { timeout }).should('be.visible').and('not.be.disabled');
  }

  // Wait for a page to be loaded completely (Cypress automatically waits for the DOM to load, so this is usually unnecessary)
  waitForPageToLoad(timeout = 10000) {
    cy.document().should((doc) => {
      expect(doc.readyState).to.equal('complete');
    });
  }

  // Get the text of an element
  getElementText(selector) {
    return cy.get(selector).invoke('text');
  }

  // Click an element
  clickElement(selector) {
    cy.get(selector).click();
  }

  // Set value in an input field
  setInputValue(selector, value) {
    cy.get(selector).clear().type(value);
  }

  // Take a screenshot
  takeScreenshot(fileName) {
    cy.screenshot(fileName);
  }

  // Handle alerts
  acceptAlert() {
    cy.on('window:alert', () => true);
  }

  dismissAlert() {
    cy.on('window:confirm', () => false);
  }

  getAlertText() {
    return cy.on('window:alert', (text) => text);
  }

  verifyChildElementContainsText(parentSelector, textToFind){
    cy.get(parentSelector).contains(textToFind);
  }
}
