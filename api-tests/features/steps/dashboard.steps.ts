import { DashboardResponseBody, WidgetsResponseBody } from '../../models';
import { AxiosResponse } from 'axios';
import { Utils } from '../../../utils/Utils';
import DashboardEndpoints from '../../endpoints/dashboard';
import WidgetsEndpoints from '../../endpoints/widgets';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Joi from 'joi';
import { PostNewDashboardResponseBody } from '../../models/dashboard/postNewDashboardResponse';
import { DeleteDashboardResponse } from '../../models/dashboard/deteleDashboardResponse';
import { expect } from '@jest/globals';

const testData = require("../../config/config");
const feature = loadFeature('api-tests/features/dashboard.feature');

const widgetsSchema = Joi.object().keys({
  widgetId: Joi.number(),
  widgetName: Joi.string().required(),
  widgetOptions: Joi.any().required(),
  widgetPosition: Joi.any().required(),
  widgetSize: Joi.string().required(),
  widgetType: Joi.string().required()
}).allow('null');

const dashboardSchema = Joi.object().keys({
  description: Joi.string(),
  owner: Joi.string().required(),
  id: Joi.number().required(),
  name: Joi.string().required(),
  widgets: Joi.array().required()
});

const postNewDashboardSchema = Joi.object().keys({
  id: Joi.number().required(),
});

let dashboard: DashboardEndpoints;
let widget: WidgetsEndpoints;
let response: AxiosResponse;

defineFeature(feature, (test) => {

  beforeAll(async () => {
    dashboard = new DashboardEndpoints();
    widget = new WidgetsEndpoints();
  });



  const thenResponseStatusCodeShouldBe = (then, responseStatusCode) => {
    then(/I should receive a status code of \$(\d+)/, expectedStatusCode => {
        expect(responseStatusCode).toEqual(expectedStatusCode);
    });
  };
  

  test('User is able to create a dashboard within POST request', ({ given, when, then }) => {
    let randomId: string;

    given('I have random data to create a dashboard', () => {
      randomId = Utils.generateRandomUsername(10);
    });

    when('I create the dashboard', async () => {
      const data = { name: `New Dashboard ID: ${randomId}`, description: `New Dashboard with Random ID: ${randomId} Description` };
      response = await dashboard.createDashboard(data, process.env.bearerToken);
    });

    then('the dashboard should be successfully created', () => {
      expect(response.data).not.toBeUndefined();
    });

    then('I should receive a status code of 201', () => {
      expect(response.status).toEqual(201);
    });

    then('the response should contain valid data for post New dashboard response', () => {
      Joi.assert(response.data, postNewDashboardSchema);
    });
  });

  test('User is able to get a created dashboard within GET request', ({ given, when, then }) => {
    let dashboardId: number;
    given('I have an existing dashboard', async () => {
        const dashboardResponse: AxiosResponse<DashboardResponseBody> = await dashboard.getDashboards(process.env.bearerToken);
        dashboardId = dashboardResponse.data.content[0].id;
      });

    when('I request the dashboard', async () => {
      response = await dashboard.getDashboardById(dashboardId.toString(), process.env.bearerToken);
    });

    then('I should receive a status code of 200', () => {
      expect(response.status).toEqual(200);
    });

    then('the dashboard should contain valid data', () => {
      Joi.assert(response.data.content, dashboardSchema);
    });
  });

  test('User is able to add a widget to a dashboard within PUT request', ({ given, when, then }) => {
    let dashboardId: number;
    let dataForWidget: any;

    given('I have an existing dashboard and widget data', async () => {
      const dashboardResponse: AxiosResponse<DashboardResponseBody> = await dashboard.getDashboards(process.env.bearerToken);
      dashboardId = dashboardResponse.data.content[0].id;
      dataForWidget = testData[process.env.testEnvironment].widgetData;
    });

    when('I add a widget to the dashboard', async () => {
      const widgetResponse: AxiosResponse = await widget.createWidget(dataForWidget, process.env.bearerToken);
      const widgetData = {
        addWidget: {
          widgetId: widgetResponse.data.id,
          widgetName: `DEMO_FILTER_${Utils.generateRandomUsername(10)}`,
          widgetType: 'overallStatistics',
          widgetPosition: { positionX: 0, positionY: 0 },
          widgetSize: { width: 6, height: 7 }
        }
      };
      response = await dashboard.addWidgetToDashboard(dashboardId.toString(), widgetData, process.env.bearerToken);
    });

    then('the widget should be successfully added', () => {
      expect(response.data).not.toBeUndefined();
    });

    then('I should receive a status code of 200', () => {
      expect(response.status).toEqual(200);
    });
  });

  test('User is able to remove a dashboard within DELETE request', ({ given, when, then }) => {
    let createdDashboardId: number;

    given('I have a dashboard to delete', async () => {
      const randomId = Utils.generateRandomUsername(10);
      const data = {
        name: `New Dashboard ID: ${randomId}`,
        description: `New Dashboard with Random ID: ${randomId} Description`
      };
      const createResponse: AxiosResponse<PostNewDashboardResponseBody> = await dashboard.createDashboard(data, process.env.bearerToken);
      createdDashboardId = createResponse.data.id;
    });

    when('I delete the dashboard', async () => {
      response = await dashboard.deleteDashboard(createdDashboardId.toString(), process.env.bearerToken);
    });

    then('the dashboard should be successfully deleted', () => {
        expect(response.status).toEqual(200)
    });

    then('I should receive a confirmation message', () => {
        expect(response.data.message).toEqual(`Dashboard with ID = '${createdDashboardId}' successfully deleted.`);
      });
  });

});
