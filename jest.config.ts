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
    maxWorkers: 4,
    setupFilesAfterEnv: ['<rootDir>/api-tests/config/setup.ts'],
    reporters: [
      "default", [
        "jest-html-reporter", {
          "outputPath": "<rootDir>/api-tests/reports/test-report.html",
          "pageTitle": "API Automation Suite",
          "includeFailureMsg": true
        }
      ],
    ]
};

export default config;