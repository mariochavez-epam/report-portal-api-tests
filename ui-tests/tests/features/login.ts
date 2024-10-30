import { Given, When, Then } from '@cucumber/cucumber';
import login from '../page-objects/login/LoginPage';
import dashboard from '../page-objects/dashboard/DashboardPage';
import { Utils } from '../../../utils/Utils';
const { browser } = require('@wdio/globals')


Given('I am on the login page', function () {
    login.navigateToLoginPage();
    login.waitForPageToLoad();
});

When('I enter a valid username and password', function () {
    login.enterUsername(browser.config.UI_USER);
    login.enterPassword(browser.config.UI_PASSWORD);
});

When('I enter an invalid username and password', function () {
    const randomUsername = Utils.generateRandomUsername(10);
    const randomPassword = Utils.generateRandomPassword(10);
    login.enterUsername(randomUsername);
    login.enterPassword(randomPassword);
});

When('I click on the login button', function () {
    login.clickLoginButton();
});

Then('I should be redirected to the dashboard page', function () {
    dashboard.isDashboardPageLoaded();
});

Then('I should see an error message', function () {
    login.getNotificationContainerMessage();
});

Then('I should see a notification for succesfull login', function () {
    login.getNotificationContainerMessage();
    login.isSuccessfulLoginMessageDisplayed();
});