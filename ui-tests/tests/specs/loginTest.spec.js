import { Utils } from "../../../utils/Utils.ts";
import DashboardPage from "../page-objects/dashboard/DashboardPage.ts";
import LoginPage from "../page-objects/login/LoginPage.ts";

const testData = require("../config/config");
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const testEnvironment = process.env.TEST_ENVIRONMENT || "prod";

describe('Login Page UI Tests', () => {

    beforeEach(() => {
        loginPage.navigateToLoginPage();
        // Navigate to the login page
    });


    it('should display an error message for invalid credentials', () => {
        const randomUsername = Utils.generateRandomUsername(10);
        const randomPassword = Utils.generateRandomPassword(10);
        loginPage.login(randomUsername, randomPassword);
        loginPage.isErrorMessageDisplayed();

        // Verify error message is displayed
        loginPage.getNotificationContainerMessage()
            .should('contain', 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
    });

    it('should successfully log in with valid credentials', () => {
        let username = testData[testEnvironment].UI_USER || 'default';
        let password = testData[testEnvironment].UI_PASSWORD || '1q2w3e';
        loginPage.login(username, password);
        loginPage.isSuccessfulLoginMessageDisplayed();
        dashboardPage.isDashboardPageLoaded();
    });
});
