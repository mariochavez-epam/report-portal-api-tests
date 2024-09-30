import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import login from "../page-objects/login/LoginPage";
import dashboard from "../page-objects/dashboard/DashboardPage";
import { Utils } from "../../../utils/Utils";

// Step definition for navigating to the login page
Given('I am on the login page', function () {
    login.navigateToLoginPage();
    login.waitForPageToLoad();
});

// Step definition for entering valid credentials
When('I enter a valid username and password', function () {
    login.enterUsername(Cypress.env('UI_USER'));
    login.enterPassword(Cypress.env('UI_PASSWORD'));
});

// Step definition for entering invalid credentials
When('I enter an invalid username and password', function () {
    const randomUsername = Utils.generateRandomUsername(10);
    const randomPassword = Utils.generateRandomPassword(10);
    login.enterUsername(randomUsername);
    login.enterPassword(randomPassword);
});

// Step definition for clicking the login button
When('I click on the login button', function () {
    login.clickLoginButton();
});

// Step definition for checking redirection to the dashboard page
Then('I should be redirected to the dashboard page', function () {
    const isDashboardLoaded = dashboard.isDashboardPageLoaded();
});

// Step definition for verifying the error message
Then('I should see an error message', function () {
    const errorMessage = login.getNotificationContainerMessage();

});

// Step definition for verifying succesfull login
Then('I should see a notification for succesfull login', function () {
    const succesfullMessage = login.getNotificationContainerMessage();
    login.isSuccessfulLoginMessageDisplayed();
});