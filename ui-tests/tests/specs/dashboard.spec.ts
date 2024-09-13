import { Utils } from "../../../utils/Utils";
import DashboardPage from "../page-objects/dashboard/DashboardPage";
import LoginPage from "../page-objects/login/LoginPage";

const testData = require("../../../api-tests/config/config.ts");
const testEnvironment = Cypress.env("TEST_ENVIRONMENT") || "prod";
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
describe('Login Page UI Tests', () => {

    beforeEach(() => {
        loginPage.navigateToLoginPage();
        cy.wait(1000);
        console.log(Cypress.env("UI_USER"));
        let username = Cypress.env("UI_USER") || "default";
        let password = Cypress.env("UI_PASSWORD") || "1q2w3e";
        loginPage.login(username, password);
    });

    it('[UI-T0007] Dashboard Page loads properly', () => {
        dashboardPage.isDashboardPageLoaded();
    });

    it('[UI-T0008] User is able to search a Dashboard by Name', () => {
        dashboardPage.searchDashboardByName('DEMO Dashboard');
        dashboardPage.verifyChildElementContainsText('[class*=gridRow__grid-row] a','DEMO Dashboard');
    });
});
