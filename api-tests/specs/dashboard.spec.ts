import { AuthResponseBody, DashboardResponseBody, WidgetsResponseBody } from '../models'
import { AxiosResponse } from 'axios'
import { expect } from '@jest/globals';
import { Utils } from '../../utils/Utils';
import DashboardEndpoints from '../endpoints/dashboard';
import AuthEndpoints from '../endpoints/auth';

import Joi from "joi";

const widgetsSchema = Joi.object().keys({
    widgetId: Joi.number().error(() => 'Widget ID should be a number.'),
    widgetName: Joi.string().required().error(() => 'WidgetName should be a string.'),
    widgetOptions: Joi.any().required().error(() => 'ID should be an object.'),
    widgetPosition: Joi.any().required().error(() => 'Name should be an object.'),
    widgetSize: Joi.string().required().error(() => 'WidgetSize should be an object.'),
    widgetType: Joi.string().required().error(() => 'WidgetType should be a string.')
  }).allow('null');

const dashboardSchema = Joi.object().keys({
  description: Joi.string().error(() => 'Description should be a string.'),
  owner: Joi.string().required().error(() => 'Owner should be a string.'),
  id: Joi.number().required().error(() => 'ID should be a number.'),
  name: Joi.string().required().error(() => 'Name should be a number.'),
  widgets: Joi.array().required()
});

let dashboard: DashboardEndpoints;
let auth: AuthEndpoints;
let access_token: string;

describe('Dashboard', () => {
  
  beforeAll(async (): Promise<void> => {
    dashboard = new DashboardEndpoints();
    auth = new AuthEndpoints();
    const response: AxiosResponse<AuthResponseBody> = await auth.login({
        username: process.env.API_USER || 'default',
        password: process.env.API_PASSWORD || "1q2w3e",
        grant_type: "password"
      });
      access_token = response.data.access_token;
  });

  test('Get dashboard Items', async () => {
    const response: AxiosResponse<DashboardResponseBody> = await dashboard.getDashboards(access_token);
    expect(response.status).toEqual(200)
    expect(response.data).not.toBeUndefined();
    await Joi.validate(response.data.content[0], dashboardSchema)


  })
  
})