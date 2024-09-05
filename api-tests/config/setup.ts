import { AxiosResponse } from "axios";
import AuthEndpoints from "../endpoints/auth";
import { AuthResponseBody } from "../models";

beforeAll(async () => {
    console.log('before all');
    const auth = new AuthEndpoints();
    const response: AxiosResponse<AuthResponseBody> = await auth.login({
        username: process.env.API_USER || 'default',
        password: process.env.API_PASSWORD || "1q2w3e",
        grant_type: "password"
    });
    process.env.bearerToken = response.data.access_token;

})