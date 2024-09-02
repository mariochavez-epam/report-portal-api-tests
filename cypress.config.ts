const { defineConfig } = require('cypress');
import { config } from "dotenv";
config();

module.exports = defineConfig({
  e2e: {
    specPattern: './ui-tests/tests/specs/**/*', // Path to your feature files
    supportFile: './ui-tests/tests/support/e2e.ts', // Path to your hooks file
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    retries: {
      runMode: 3,
      openMode: 0,
    },
    chromeWebSecurity: false,
    env: {
      BASE_URL: process.env.BASE_URL,
      API_USER: process.env.API_USER,
      API_PASSWORD: process.env.API_PASSWORD,
      UI_USER: process.env.UI_USER,
      UI_PASSWORD: process.env.UI_PASSWORD,
      // Custom environment variables can be set here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    reporter: 'spec',
    screenshotOnRunFailure: true,
    // Set to true to take screenshots on failure automatically
    setupNodeEvents(on, config) {
       // Get environment variable from Cypress config

    },
  },

  // Setting Chrome browser as the default browser
  browser: 'chrome',
  browserOptions: {
    headless: false, // Set to true if you want to run headless
  },
});
