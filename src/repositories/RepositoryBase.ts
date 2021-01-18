class RepositoryBase {
  public db: any;
  public jf: any;
  public queryRunner: any;
  public sendColumn: any;
  public service: any;

  constructor(db: any, jf: any, service: any, sendColumn: any) {
    this.db = db;
    this.jf = jf;
    this.sendColumn = sendColumn;
    this.service = service;
  }

  async createQueryRunner() {
    this.queryRunner = this.db.getDb().getConnection().createQueryRunner();
  }

  async releaseQueryRunner() {
    await this.queryRunner.release();
  }

  async startTransaction() {
    await this.createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  async commitTransaction() {
    await this.queryRunner.commitTransaction();
    await this.releaseQueryRunner();
  }

  async rollbackTransaction() {
    await this.queryRunner.rollbackTransaction();
    await this.releaseQueryRunner();
  }
}

export default RepositoryBase;
