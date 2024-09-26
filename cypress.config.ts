import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
import { config } from 'dotenv';
config();


module.exports = defineConfig({
  e2e: {
    specPattern: './ui-tests/tests/features/**/*.feature', // Path to your feature files
    supportFile: false, // Path to your hooks file
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    chromeWebSecurity: false,
    env: {
      // Custom environment variables can be set here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    reporter: 'spec',
    screenshotOnRunFailure: true,
    // Set to true to take screenshots on failure automatically
    setupNodeEvents(on, config) {
      // Event listeners to handle various Cypress events
      const options = browserify.defaultOptions;
      on("file:preprocessor", cucumber());
      return config;

    },
  },
});
