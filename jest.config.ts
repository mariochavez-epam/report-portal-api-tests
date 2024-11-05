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
    'default',
    [
      '@reportportal/agent-js-jest',
      {
        endpoint: "https://rp.epam.com/api/v1",
        apiKey: process.env.RP_API_KEY,
        project: "mario_chavez_personal",
        launch: "API Testing Suite - Report Portal",
        description: "New Launch for api testing framework using Jest",
        attributes: [
          {
            key: "attributeKey",
            value: "attrbiuteValue",
          },
          {
            value: "anotherAttrbiuteValue",
          },
        ],
        mode: 'DEFAULT',
      }
    ]
  ],
  // This will look for .feature files and their corresponding step definition files.
  testMatch: [
    "**/features/**/*.steps.ts"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Transform TypeScript files
  }
};

export default config;