import { RestClient } from "../../restClient/client";
import { Logger } from "tslog";
const testData = require("../../config/config");


export abstract class AEndpoint {
  protected constructor(serviceUrl: string) {
    console.log(testData);
    let testEnvironment = process.env.TEST_ENVIRONMENT || "local";
    const baseUrl: string = testData[testEnvironment].baseURL || "https://rp.epam.com/uat";
    this.url = baseUrl + serviceUrl ;
    this.restClient = new RestClient(this.url);
    this.log.info(`The Service URL is ${this.url}`);
  }

  public createdItemIds: Set<string> = new Set();

  protected url: string;

  protected log: Logger = new Logger({
    minLevel: "debug",
    dateTimeTimezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  public restClient: RestClient;

}