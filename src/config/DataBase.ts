import * as typeorm from "typeorm";
import { tm_user } from "../entities/masters/UserEntity";

class DataBase {
  private typeDb: any;
  private urlDb: any;
  private logger: any;

  constructor(variables: any, logger: any) {
    const { typeDb, urlDb } = variables;

    this.typeDb = typeDb;
    this.urlDb = urlDb;
    this.logger = logger;

    this.connect();
  }

  async connect() {
    return await typeorm.createConnection({
      type: this.typeDb,
      url: this.urlDb,
      synchronize: true,
      entities: [
        tm_user
      ]
    })
    .then((connection) => {
      this.logger.info("Success connect to database.");
      return connection;
    })
    .catch((err) => {
      throw new Error(`ERROR DATABASE: ${err}`);
    });
  }

  getDb() {
    return typeorm;
  }
}

export default DataBase;
