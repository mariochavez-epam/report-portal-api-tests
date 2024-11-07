import { AxiosResponse } from "axios";
import AuthEndpoints from "../endpoints/auth";
import { AuthResponseBody } from "../models";
import { SlackIntegration } from "../../utils/SlackIntegration";
const slack = new SlackIntegration('https://hooks.slack.com/services/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');

beforeAll(async () => {
    await slack.sendMessage(`Test Suite starting\nStarting on: ${new Date().toLocaleString()}`);

    console.log('before all');
    const auth = new AuthEndpoints();
    const response: AxiosResponse<AuthResponseBody> = await auth.login({
        username: process.env.API_USER || 'default',
        password: process.env.API_PASSWORD || "1q2w3e",
        grant_type: "password"
    });
    process.env.bearerToken = response.data.access_token;
    process.env.testEnvironment = process.env.TEST_ENVIRONMENT || "local";
})