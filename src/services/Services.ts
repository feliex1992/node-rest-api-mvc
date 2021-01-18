import CacheData from "./CacheData";
import Logger from "./Logger";
import Security from "./Security";
import UserService from "./UserService";

class Services {
  private variables: any;

  public cacheData: any;
  public logger: any;
  public security: any;
  public user: any;

  constructor(variables: any) {
    this.variables = variables;

    this.registerService();
  }

  registerService() {
    this.cacheData = new CacheData();
    this.logger = new Logger();
    this.security = new Security(this.variables, this.cacheData);
    this.user = new UserService();
  }
}

export default Services;
