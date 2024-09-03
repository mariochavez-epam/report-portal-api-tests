import { AxiosResponse } from "axios";
import { AEndpoint } from "./abstract/AEndpoint";
const testData = require("../config/config");

export default class DashboardEndpoints extends AEndpoint {
  constructor() {
    let testEnvironment = process.env.TEST_ENVIRONMENT || "local";
    super(`/api/v1/${testData[testEnvironment].PROJECT_NAME}/dashboard`);
    //?page.page=1&page.size=300&page.page=1&page.size=300&page.sort=
  }

  public async getDashboards(authToken: string): Promise<AxiosResponse> {

  let requestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
  };
    return this.restClient.sendGet({ authToken: authToken, headers: requestHeaders});
  }
}