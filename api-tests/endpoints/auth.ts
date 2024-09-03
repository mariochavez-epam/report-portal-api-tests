import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AEndpoint } from "./abstract/AEndpoint";
import { AuthRequestBody } from "../models";

export default class AuthEndpoints extends AEndpoint {
  constructor() {
    super("/uat/sso/oauth/token");
  }

  public async login(data: AuthRequestBody): Promise<AxiosResponse> {
    const payload: AxiosRequestConfig<AuthRequestBody> = {
      data
    }
  ;
  let requestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
    'Authorization': 'Basic dWk6dWltYW4='
  };
    return this.restClient.sendPost({ headers: requestHeaders,additionalConfigs: payload });
  }
}