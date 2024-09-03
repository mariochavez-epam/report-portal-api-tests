import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AEndpoint } from "./abstract/AEndpoint";
import { AuthRequestBody } from "../models";

export default class DashboardEndpoints extends AEndpoint {
  constructor() {
    super("/api/v1/default_personal/dashboard");
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