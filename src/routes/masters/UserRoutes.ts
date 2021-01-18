import RouteBase from "../RoutesBase";
import UserController from "../../controllers/masters/UserController";

class UserRoutes extends RouteBase {
  constructor() {
    super(UserController);
  }

  getRoutes() {
    this.buildRoute("/users/login","post", "loginUser");
    this.buildRoute("/users", "get", "getUsers", true);
    this.buildRoute("/users/by-user-id/:user_id", "get", "getUserByUserId", true);
    this.buildRoute("/users/add", "post", "addUser");

    return this.routes;
  }
}

export default UserRoutes;
