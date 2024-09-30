// tests/hooks/hooks.js

const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');

// Import page objects or utilities as needed
const LoginPage = require('../tests/page-objects/login/LoginPage');
const DashboardPage = require('../tests/page-objects/dashboard/DashboardPage');

BeforeAll(async function () {
    // Runs before all tests
    console.log('Starting test suite...');

    // Set browser window size or any global setup
    await browser.maximizeWindow();
});

AfterAll(async function () {
    // Runs after all tests
    console.log('Test suite completed.');

    // You can add global cleanup here if needed
    await browser.deleteCookies();
});

Before(async function (scenario) {
    // Runs before each scenario
    console.log(`Starting scenario: ${scenario.pickle.name}`);
});

After(async function (scenario) {
    // Runs after each scenario
    console.log(`Finished scenario: ${scenario.pickle.name}`);

    // Take a screenshot if the scenario fails
    if (scenario.result.status === 'failed') {
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }

    // Reset application state if needed
    await LoginPage.navigateToLoginPage(); // Example: Logging out after each scenario
});
