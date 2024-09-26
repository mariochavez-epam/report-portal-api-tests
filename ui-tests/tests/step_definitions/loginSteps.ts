const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../page-objects/login/LoginPage');
const DashboardPage = require('../page-objects/dashboard/DashboardPage');

// Step definition for navigating to the login page

Given('I am on the login page', async function () {
    await LoginPage.navigateToLoginPage();
    await LoginPage.waitForPageToLoad();
});

// Step definition for entering valid credentials
When('I enter a valid username and password', async function () {
    await LoginPage.enterUsername('default'); // Replace with actual valid username
    await LoginPage.enterPassword('1q2w3e'); // Replace with actual valid password
});

// Step definition for entering invalid credentials
When('I enter an invalid username and password', async function () {
    await LoginPage.enterUsername('askdjaskdjaksd'); // Replace with actual invalid username
    await LoginPage.enterPassword('invalidPassword'); // Replace with actual invalid password
});

// Step definition for clicking the login button
When('I click on the login button', async function () {
    await LoginPage.clickLoginButton();
});

// Step definition for checking redirection to the dashboard page
Then('I should be redirected to the dashboard page', async function () {
    const isDashboardLoaded = await DashboardPage.isDashboardPageLoaded();
    assert.strictEqual(isDashboardLoaded, true, 'Dashboard page did not load as expected');
});

// Step definition for verifying the error message
Then('I should see an error message', async function () {
    const errorMessage = await LoginPage.getNotificationContainerMessage();
    assert.equal(errorMessage, 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials')

});

// Step definition for verifying succesfull login
Then('I should see a notification for succesfull login', async function () {
    // const isSuccesfullLoginMessagDisplayed = await LoginPage.isSuccesfullLoginMessagDisplayed();
    // assert.strictEqual(isSuccesfullLoginMessagDisplayed, true, 'Succesfully message was not displayed');
    const succesfullMessage = await LoginPage.getNotificationContainerMessage();
    assert.equal(succesfullMessage, 'Signed in successfully')
});