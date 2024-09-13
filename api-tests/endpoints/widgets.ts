import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AEndpoint } from "./abstract/AEndpoint";
import { DashboardRequestBody } from "../models/dashboard/request";
import { CreateWidgetResponseBody } from "../models/widgets/createWidgetResponse";
const testData = require("../config/config");

export default class WidgetsEndpoints extends AEndpoint {
  constructor() {
    let testEnvironment = process.env.TEST_ENVIRONMENT || "local";
    super(`/api/v1/${testData[testEnvironment].PROJECT_NAME}/widget`);
    //?page.page=1&page.size=300&page.page=1&page.size=300&page.sort=
  }


  public async createWidget(data: CreateWidgetResponseBody, authToken: string): Promise<AxiosResponse> {
    const payload: AxiosRequestConfig<CreateWidgetResponseBody> = {
      data
    }
    return this.restClient.sendPost({ additionalConfigs: payload, authToken: authToken });
  }
}