import RoutesCollection from "./RoutesCollection";
import UserRoutes from "./masters/UserRoutes";

class Routes {
  private routeBuilders: any;

  constructor() {
    this.routeBuilders = [
      new UserRoutes()
    ]
  }

  registerRoutes(registerRouteCallback: any, createRouteBoundAction: any) {
    this.routeBuilders.map((builder: any) => {
      const routes = builder.getRoutes();
      routes.map((routeData: any) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action, {
          uri: routeData.uri, httpMethod: routeData.httpMethod
        });
        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      })
    })
  }
}

export default Routes;
