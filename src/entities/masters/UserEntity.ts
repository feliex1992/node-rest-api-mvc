import { Entity, PrimaryColumn, Column } from "typeorm";
import * as jf from "joiful";

@Entity()
export class tm_user {
  
  @PrimaryColumn()
  user_id: string;

  @Column()
  user_name: string;

  @Column()
  level: string;
  
  @Column()
  password: string;

  @Column()
  kode_toko: string;
}

export class ValidAddUser {
  @jf.string().required()
  user_id: string;

  @jf.string().required()
  user_name: string;

  @jf.string().required()
  level: string;

  @jf.string().required()
  password: string;

  @jf.string().required()
  retype_password: string;

  @jf.string().required()
  kode_toko: string;
}

export class ValidLoginUser {
  @jf.string().required()
  user_id: string;

  @jf.string().required()
  password: string;
}