
const { Given, BeforeAll, Before, BeforeStep, AfterStep, After, AfterAll } = require('@cucumber/cucumber');

BeforeAll(() => {
    console.log('before all tests run...');
});

Before(function () {
    // Note: access the scenario context here using `this`.
    console.log('before each test runs...');
});

BeforeStep(function () {
    // Available as of Cucumber.js 7.x
    console.log('before each test step runs...');
});

AfterStep(function () {
    // Available as of Cucumber.js 7.x
    console.log('after each test step runs...');
});

After(function () {
    // Note: access the scenario context here using `this`.
    console.log('after each test runs...');
});

AfterAll(() => {
    console.log('after all tests run...');
});

Given('my step definition runs...', function () {
    // step definition code.
    console.log('my step definition during the test.');
});
    
