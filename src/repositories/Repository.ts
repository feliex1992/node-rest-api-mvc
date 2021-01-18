import UserRepository from "./masters/UserRepositories";

class Repository {
  private _db: any;
  private _jf: any;
  private _service: any;

  private users: any;

  constructor(db: any, jf: any, service: any) {
    this._db = db;
    this._jf = jf;
    this._service = service;
  }

  registerRepositories() {
    this.users = new UserRepository(this._db, this._jf, this._service);
  }
}

export default Repository;
