class Variables {
  private jwtPrivateKey: any;
  private port: any;
  private typeDb: any;
  private urlDb: any;

  constructor() {
    this.jwtPrivateKey = process.env.JWTKEY_API;
    this.port = process.env.PORT_API;
    this.typeDb = process.env.TYPEDB_API;
    this.urlDb = process.env.URLDB_API;

    this.checkVariables();
  }

  checkVariables() {
    if (!this.jwtPrivateKey) throw new Error("ERROR: JWT key api not found!");
    if (!this.port) throw new Error("ERROR: Port api not found!");
    if (!this.typeDb) throw new Error("ERROR: Type Database api not found!");
    if (!this.urlDb) throw new Error("ERROR: Url Connection Database api not found!");
  }

  getVariables() {
    return {
      jwtPrivateKey: this.jwtPrivateKey,
      port: this.port,
      typeDb: this.typeDb,
      urlDb: this.urlDb
    };
  }
}

export default Variables;