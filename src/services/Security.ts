import * as jwt from "jsonwebtoken";

class Security {
  private jwtPrivateKey: any;

  constructor(variables: any) {
    this.jwtPrivateKey = variables.jwtPrivateKey;
  }

  generateToken(userData: any) {
    const token = jwt.sign({ user_id: userData.user_id, level: userData.level, validate_time: new Date()}, this.jwtPrivateKey);
    return token;
  }

  authenticate() {
    return [
      (req: any, res: any, next: any) => {
        if (req.headers["x-auth-token"] !== "test") {
          return res.status(400).send("Un Authorization!!!");
        }

        next();
      }
    ]
  }
}

export default Security;