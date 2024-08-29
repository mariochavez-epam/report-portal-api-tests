import { RestClient } from "../../restClient/client";
import { Logger } from "tslog";


export abstract class AEndpoint {
  protected constructor(serviceUrl: string) {
    const baseUrl: string = "http://localhost:8080/uat";
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