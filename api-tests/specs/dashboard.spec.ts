import { AuthResponseBody, DashboardResponseBody, WidgetsResponseBody } from '../models'
import { AxiosResponse } from 'axios'
import { expect } from '@jest/globals';
import { Utils } from '../../utils/Utils';
import DashboardEndpoints from '../endpoints/dashboard';
import AuthEndpoints from '../endpoints/auth';

import Joi from "joi";
import { PostNewDashboardResponseBody } from '../models/dashboard/postNewDashboardResponse';
import { DeleteDashboardResponse } from '../models/dashboard/deteleDashboardResponse';

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

const postNewDashboardSchema = Joi.object().keys({
    id: Joi.number().required().error(() => 'ID should be a number.'),
});

let dashboard: DashboardEndpoints;

describe('Dashboard', () => {
  beforeAll(async (): Promise<void> => {
    dashboard = new DashboardEndpoints();
  });

  test('Create a new Dashboard using POST Statement', async () => {
    const randomId = Utils.generateRandomUsername(10);
    let data = {name: `New Dashboard ID: ${randomId}`, description: `New Dashboard with Random ID: ${randomId} Description`}
    const response: AxiosResponse<PostNewDashboardResponseBody> = await dashboard.createDashboard(data,process.env.bearerToken);
    expect(response.status).toEqual(201)
    expect(response.data).not.toBeUndefined();
    await Joi.validate(response.data, postNewDashboardSchema);
  })

  test('Delete Dashboard', async () => {
    const randomId = Utils.generateRandomUsername(10);
    let data = {name: `New Dashboard ID: ${randomId}`, description: `New Dashboard with Random ID: ${randomId} Description`}
    const response: AxiosResponse<PostNewDashboardResponseBody> = await dashboard.createDashboard(data,process.env.bearerToken);
    expect(response.status).toEqual(201)
    expect(response.data).not.toBeUndefined();
    const deleteResponse: AxiosResponse<DeleteDashboardResponse> = await dashboard.deleteDashboard(response.data.id.toString(), process.env.bearerToken);
    expect(deleteResponse.data.message).toEqual(`Dashboard with ID = '${response.data.id}' successfully deleted.` )
  })

  test('Get dashboard Items', async () => {
    const response: AxiosResponse<DashboardResponseBody> = await dashboard.getDashboards(process.env.bearerToken);
    expect(response.status).toEqual(200)
    expect(response.data).not.toBeUndefined();
    await Joi.validate(response.data.content[0], dashboardSchema)
  })

  test('Get dashboard by Id', async () => {
    const response: AxiosResponse<DashboardResponseBody> = await dashboard.getDashboardById('183588',process.env.bearerToken);
    expect(response.status).toEqual(200)
    expect(response.data).not.toBeUndefined();
    console.log(response.data);
    await Joi.validate(response.data.content, dashboardSchema)
  })
  
})