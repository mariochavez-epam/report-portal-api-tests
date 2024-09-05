import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  "preset": "ts-jest",
    "testPathIgnorePatterns": [
      "<rootDir>/ui-tests/*"
    ],
    "moduleDirectories": [
      "node_modules",
      "<rootDir>"
    ],
    setupFilesAfterEnv: ['<rootDir>/api-tests/config/setup.ts'],
    reporters: [
      "default", [
        "jest-html-reporter", {
          "outputPath": "./reports/test-report.html",
          "pageTitle": "Automation Test with askui",
          "includeFailureMsg": true
        }
      ],
    ]
};

export default config;