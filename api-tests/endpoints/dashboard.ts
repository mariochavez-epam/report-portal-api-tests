import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AEndpoint } from "./abstract/AEndpoint";
import { DashboardRequestBody } from "../models/dashboard/request";
const testData = require("../config/config");

export default class DashboardEndpoints extends AEndpoint {
  constructor() {
    let testEnvironment = process.env.TEST_ENVIRONMENT || "local";
    super(`/api/v1/${testData[testEnvironment].PROJECT_NAME}/dashboard`);
    //?page.page=1&page.size=300&page.page=1&page.size=300&page.sort=
  }


  public async createDashboard(data: DashboardRequestBody, authToken: string): Promise<AxiosResponse> {
    const payload: AxiosRequestConfig<DashboardRequestBody> = {
      data
    }
    return this.restClient.sendPost({ additionalConfigs: payload, authToken: authToken });
  }

  public async deleteDashboard(id: string, authToken: string): Promise<AxiosResponse> {
    return this.restClient.sendDelete({ route: `${this.url}/${id}`, authToken: authToken });
  }

  public async getDashboards(authToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({ authToken: authToken });
  }

  public async getDashboardById(id: string, authToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: `${this.url}/${id}`, authToken: authToken });
  }

  public async addWidgetToDashboard(id: string, data: any, authToken: string): Promise<AxiosResponse> {
    const payload: AxiosRequestConfig = {
      data
    }
    return this.restClient.sendPut({ route: `${this.url}/${id}/add`, additionalConfigs: payload, authToken: authToken });
  }
}