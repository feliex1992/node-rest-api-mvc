import * as jwt from "jsonwebtoken";

class Security {
  private jwtPrivateKey: any;
  private cacheData: any;

  constructor(variables: any, cacheData: any) {
    this.jwtPrivateKey = variables.jwtPrivateKey;
    this.cacheData = cacheData;
  }

  generateToken(userData: any) {
    const token = jwt.sign({ user_id: userData.user_id, level: userData.level, validate_time: new Date()}, this.jwtPrivateKey);
    return token;
  }

  authenticate() {
    return [
      (req: any, res: any, next: any) => {
        const token = req.headers["x-auth-token"];
        if (!token) return res.status(401).send("Access denied. No token provided.");

        try {
          const decoded = jwt.verify(token, this.jwtPrivateKey);
          req.user = decoded;
          
          const cacheToken = this.cacheData.getCache(req.user);
          if (cacheToken.token !== token) return res.status(400).send("Invalid token.");

          this.cacheData.changeTTL(req.user);
          next();
        } catch(err) {
          res.status(400).send("Invalid token.");
        }
      }
    ]
  }
}

export default Security;