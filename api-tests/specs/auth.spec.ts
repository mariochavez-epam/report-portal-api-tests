import { AuthResponseBody } from '../models'
import { AxiosResponse } from 'axios'
import AuthEndpoints from '../endpoints/auth';
import { expect } from '@jest/globals';
import { Utils } from '../../utils/Utils';

let auth: AuthEndpoints;

describe('Authorization & Authentication', () => {
  
  beforeAll(async (): Promise<void> => {
    auth = new AuthEndpoints();
  });

  test('Sign in with existing credentials', async () => {
    const response: AxiosResponse<AuthResponseBody> = await auth.login({
      username: process.env.API_USER || 'default',
      password: process.env.API_PASSWORD || "1q2w3e",
      grant_type: "password"
    });

    expect(response.status).toEqual(200)
    expect(response.data).not.toBeUndefined();
    expect(response.data).not.toBeUndefined();
    expect(response.data).not.toBeUndefined();
  })

  test('Sign in with not existing credentials', async () => {
    const randomUsername = Utils.generateRandomUsername(10);
    const randomPassword = Utils.generateRandomPassword(10);
    const response: AxiosResponse<AuthResponseBody> = await auth.login({
      username: randomUsername,
      password: "itwillfail" + randomPassword,
      grant_type: "password"
    });
    expect(response.status).toEqual(400)
    expect(response.data.message).toEqual("You do not have enough permissions. Bad credentials")
  })
  
})