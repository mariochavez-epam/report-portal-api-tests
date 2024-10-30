import { AuthResponseBody } from '../models'
import { AxiosResponse } from 'axios'
import AuthEndpoints from '../endpoints/auth';
import { expect } from '@jest/globals';
import { Utils } from '../../utils/Utils.ts';

import Joi from "joi";

const authSchema = Joi.object().keys({ 
  message: Joi.any(),
  access_token: Joi.string().error(() => 'Access_token field should be a string.'),
  token_type: Joi.string().error(() => 'Token_type field should be a string.'),
  refresh_token:  Joi.string().error(() => 'Refresh_token field should be a string.'),
  expires_in:  Joi.number().error(() => 'Expires_in field should be a number.'),
  scope:  Joi.string().error(() => 'Scope field should be a string.'),
  jti: Joi.string().error(() => 'JTI field should be a string.')
}); 

const errorSchema = Joi.object().keys({
  errorCode: Joi.number().required().error(() => 'Error code should be a number.'),
  message: Joi.string().required().error(() => 'Message of error should be a string')
});

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
    await Joi.validate(response.data, authSchema)
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
    expect(response.data.message).toEqual("You do not have enough permissions. Bad credentials");
    await Joi.validate(response.data, errorSchema);
  })
  
})