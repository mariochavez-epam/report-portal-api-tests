

const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');

const pages = {
    login: LoginPage,
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When('I enter a valid username and password', async (page) => {
    await pages.login.enterUsername("default");
    console.log("process.env.UI_PASSWORD") ;
    console.log(process.env.UI_PASSWORD);
    await pages.login.enterPassword(process.env.UI_PASSWORD);
});

When('I enter an invalid username and password', async () => {
    const randomUsername = "someFakeuserNAME";
    const randomPassword = "someRANDOMEPASSSWORD";
    await pages.login.enterUsername(randomUsername);
    await pages.login.enterPassword(randomPassword);
});

When('I click on the login button', async () => {
    await pages.login.clickLoginButton();
});

Then('I should be redirected to the dashboard page', async () => {
});

Then('I should see an error message', async () => {
    await pages.login.getNotificationContainerMessage();
});

Then('I should see a notification for succesfull login', async () => {
    await pages.login.getNotificationContainerMessage();
    await pages.login.isSuccessfulLoginMessageDisplayed();
}); 