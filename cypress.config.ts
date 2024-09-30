import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
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
        baseUrl: 'https://rp.epam.com' || process.env.BASE_URL,
        UI_USER: 'mchavezTest' || process.env.UI_USER,
        UI_PASSWORD: 'sa7asa7a' || process.env.UI_PASSWORD,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    reporter: 'spec',
    screenshotOnRunFailure: true,
    // Set to true to take screenshots on failure automatically
    setupNodeEvents(on, config) {
      // Event listeners to handle various Cypress events
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      return config;

    },
  },
});
