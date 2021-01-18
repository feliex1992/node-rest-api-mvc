import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jf from "joiful";

import App from "./App";
import Variables from "./config/Variables";
import Routes from "./routes/Routes";
import Repository from "./repositories/Repository";
import DataBase from "./config/DataBase";
import Service from "./services/Services";

dotenv.config();
const variables = new Variables();
const service = new Service(variables.getVariables());

const app = new App(
  new Routes,
  new Repository(new DataBase(variables.getVariables(), service.logger), jf, service),
  variables.getVariables(),
  service
);
app.start();
