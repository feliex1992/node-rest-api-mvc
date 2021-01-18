import RepositoryBase from "../RepositoryBase";
import { tm_user, ValidAddUser, ValidLoginUser } from "../../entities/masters/UserEntity";

class UserRepositories extends RepositoryBase {
  constructor(db: any, jf: any, service: any) {
    const sendColumn = ["user.user_id", "user.user_name", "user.level", "user.kode_toko"];

    super(db, jf, service, sendColumn);
  }

  validateAddUser(userData: any) {
    const result = this.jf.validateAsClass(userData, ValidAddUser);
    return result;
  }

  validateLoginUser(userData: any) {
    const result = this.jf.validateAsClass(userData, ValidLoginUser);
    return result;
  }

  async getUserById(user_id: any) {
    const result = await this.queryRunner.manager.createQueryBuilder()
      .select(this.sendColumn)
      .from(tm_user, "user")
      .where("user.user_id = :user_id", { user_id: user_id })
      .getOne();
  
    return result;
  }

  async getUsers() {
    const result = await this.queryRunner.manager.createQueryBuilder()
      .select(this.sendColumn)
      .from(tm_user, "user")
      .where()
      .getMany();

    return result;
  }

  async addUser(userData: any) {
    return new Promise (async(resolve: any, reject: any) => {
      try{
        const newUser = {
          user_id: userData.user_id,
          user_name: userData.user_name,
          level: userData.level,
          password: userData.password,
          kode_toko: userData.kode_toko
        }
        newUser.password = await this.service.userService.hashPassword(newUser.password);

        const result = await this.queryRunner.manager.createQueryBuilder()
          .insert()
          .into(tm_user)
          .values([
              newUser
          ])
          .execute();

        resolve("Simpan data user berhasil.");
      } catch(err) {
        reject(err);
      }
    });
  }

  async deleteUser(user_id: any) {
    let result = await this.queryRunner.manager.createQueryBuilder()
      .select()
      .from(tm_user)
      .where("user_id = :user_id", { user_id: user_id })
      .getOne();
    return result;
  }

  async loginUser(userData: any) {
    return new Promise(async(resolve, reject) => {
      try {
        const sendColumn = this.sendColumn;
        sendColumn.push("user.password");

        const user = await this.queryRunner.manager.createQueryBuilder()
          .select(sendColumn)
          .from(tm_user, "user")
          .where("user.user_id = :user_id", { user_id: userData.user_id })
          .getOne();
        if (!user) return reject("User Id atau password salah!");

        const matchPassword = await this.service.user.comparePassword(userData.password, user);
        if(!matchPassword) return reject("User Id atau password salah!");

        const token = await this.service.security.generateToken(user);
        if(!token) return reject("Generate token gagal!");

        let result = await this.service.cacheData.storeCache({ user_id: user.user_id, token: token });
        if (!result) return reject("Gagal simpan token di cache!");

        resolve({
          user_id: user.user_id,
          user_name: user.user_name,
          level: user.level,
          token: token
        });
      } catch(err) {
        reject(err);
      }
    });
  }

  async getCache(userId: any) {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await this.service.cacheData.getCache({ "user_id": userId });
        resolve(result);
      } catch(err) {
        reject(err);
      }
    });
  } 
}

export default UserRepositories;
