
const { browser } = require('@wdio/globals');
const { $ } = require('@wdio/globals');

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class BasePage {
    baseUrl = "https://rp.epam.com";

    async getBaseUrl() {
        return await this.baseUrl;
    }

    async navigateTo(url) {
        await browser.url(this.baseUrl + url);
    }

    async waitForElementVisible(selector, timeout = 5000) {
        await $(selector).waitForDisplayed(timeout);
    }

    async waitForElementClickable(selector, timeout = 5000) {
        await $(selector).waitForEnabled(timeout);
    }

    async waitForPageToLoad(timeout = 10000) {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout }
        );
    }

    async getElementText(selector) {
        return await $(selector).getText();
    }

    async clickElement(selector) {
        await $(selector).click();
    }

    async setInputValue(selector, value) {
        const inputField = $(selector);
        await inputField.clearValue();
        await inputField.setValue(value);
    }

    async takeScreenshot(fileName) {
        await browser.saveScreenshot(fileName);
    }

    async acceptAlert() {
        await browser.acceptAlert();
    }

    async dismissAlert() {
        await browser.dismissAlert();
    }

    async getAlertText() {
        return await browser.getAlertText();
    }

    async verifyChildElementContainsText(parentSelector, textToFind){
        await $(parentSelector).$('*=textToFind');
    }

  
}