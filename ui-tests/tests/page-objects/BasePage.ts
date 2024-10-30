import {$} from'@wdio/globals';
import {browser} from '@wdio/globals';

export abstract class BasePage {
    baseUrl = "https://rp.epam.com";

    getBaseUrl() {
        return this.baseUrl;
    }

    navigateTo(url) {
        browser.url(this.baseUrl + url);
    }

    waitForElementVisible(selector, timeout = 5000) {
        $(selector).waitForDisplayed(timeout);
    }

    waitForElementClickable(selector, timeout = 5000) {
        $(selector).waitForEnabled(timeout);
    }

    waitForPageToLoad(timeout = 10000) {
        browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout }
        );
    }

    getElementText(selector) {
        return $(selector).getText();
    }

    clickElement(selector) {
        $(selector).click();
    }

    setInputValue(selector, value) {
        const inputField = $(selector);
        inputField.clearValue();
        inputField.setValue(value);
    }

    takeScreenshot(fileName) {
        browser.saveScreenshot(fileName);
    }

    acceptAlert() {
        browser.acceptAlert();
    }

    dismissAlert() {
        browser.dismissAlert();
    }

    getAlertText() {
        return browser.getAlertText();
    }

    verifyChildElementContainsText(parentSelector, textToFind){
        $(parentSelector).$('*=textToFind');
    }

  
}