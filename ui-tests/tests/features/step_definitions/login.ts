import {Given, When, Then} from '@cucumber/cucumber';
import login from '../../page-objects//login/LoginPage.ts';
import dashboard from '../../page-objects/dashboard/DashboardPage.ts';

import {Utils} from '../../../../utils/Utils.ts';


Given('I am on the login page', async () => {
    await login.navigateToLoginPage();
    await login.waitForPageToLoad();
});

When('I enter a valid username and password', async () => {
    await login.enterUsername(process.env.UI_USER);
    await login.enterPassword(process.env.UI_PASSWORD);
});

When('I enter an invalid username and password', async () => {
    const randomUsername = Utils.generateRandomUsername(10);
    const randomPassword = Utils.generateRandomPassword(10);
    await login.enterUsername(randomUsername);
    await login.enterPassword(randomPassword);
});

When('I click on the login button', async () => {
    await login.clickLoginButton();
});

Then('I should be redirected to the dashboard page', async () => {
    await dashboard.isDashboardPageLoaded();
});

Then('I should see an error message', async () => {
    await login.getNotificationContainerMessage();
});

Then('I should see a notification for succesfull login', async () => {
    await login.getNotificationContainerMessage();
    await login.isSuccessfulLoginMessageDisplayed();
});