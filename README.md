# Test Automation Suite
## _Report Portal application (API / UI)_

## Testing Tools:
[Jest](https://jestjs.io/docs/jest-platform)
[Cucumber](https://cucumber.io)
[Cypress](https://www.cypress.io)

## Features
- Dashboard
- Login

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies.

```sh
cd dillinger
npm install
```

To run UI Test
```sh
npm run cypress:open
```

To run API Test
```sh
npm test
```

## Environment Variables
You should have the following .env files on the project root.

How to setup .ENV file:
Please create a .env file for this project, with the following entries:

# Environment variables.
TEST_ENVIRONMENT = "prod"
API_USER="someUser"
API_PASSWORD="somePassword"
UI_USER="uiUser"
UI_PASSWORD="uiPassword"
