import ControllerBase from "../ControllerBase";

class UserController extends ControllerBase {
  async getUsers() {
    await this.repository.users.createQueryRunner();

    const result = await this.repository.users.getUsers();

    await this.repository.users.releaseQueryRunner();
    this.success(result);
  }

  async getUserByUserId() {
    await this.repository.users.createQueryRunner();

    const result = await this.repository.users.getUserById(this.params.user_id);

    await this.repository.users.releaseQueryRunner();
    this.success(result);
  }

  async addUser() {
    try {
      const { error } = this.repository.users.validateAddUser(this.body);
      if (error) this.error({ statusCode: 400, message: error.details[0].message });

      if (this.body.password !== this.body.retype_password) return this.error({ statusCode: 400, message: "Password dan retype-password tidak sama!"});

      await this.repository.users.startTransaction();

      let result = await this.repository.users.getUserById(this.body.user_id);
      if (result) {
        await this.repository.users.rollbackTransaction();
        return this.error({ statusCode: 400, message: "User id sudah terdaftar!"});
      }
      result = await this.repository.users.addUser(this.body);

      await this.repository.users.commitTransaction();
      this.success(result);
    } catch(err) {
      await this.repository.users.rollbackTransaction();
      this.error(err);
    }
  }

  async updateUserByUserId() {

  }

  async deleteUser() {
    
  }

  async loginUser() {
    try {
      const { error } = this.repository.users.validateLoginUser(this.body);
      if (error) this.error({ statusCode: 400, message: error.details[0].message });

      await this.repository.users.startTransaction();

      const result = await this.repository.users.loginUser(this.body);

      await this.repository.users.commitTransaction();
      this.success(result);
    } catch(err) {
      await this.repository.users.rollbackTransaction();
      this.error(err);
    }
  }
}

export default UserController;
