import { BadRequestException } from "@nestjs/common";

import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
  ManyToOne,
  EntityRepositoryType,
} from "@mikro-orm/core";

import { UserProfilesRepository } from "@/modules/user-profiles/user-profiles.repository";

import { Account } from "./accounts.entity";
import { CustomBaseEntity } from "./custom-base.entity";
import { Role } from "./roles.entity";
import { User } from "./users.entity";

@Entity({
  tableName: "user_profiles",
  repository: () => UserProfilesRepository,
})
export class UserProfile extends CustomBaseEntity {
  [EntityRepositoryType]?: UserProfilesRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: "first_name" })
  firstName!: string;

  @Property({ fieldName: "last_name" })
  lastName!: string;

  @Property({ fieldName: "phone_number" })
  phoneNumber!: string;

  @Property({ persist: false })
  get email() {
    return this.user === undefined
      ? new BadRequestException("User not properly defined")
      : this.user.email;
  }

  @Property()
  address!: string;

  @Property()
  thana!: string;

  @Property()
  district!: string;

  @Property()
  nid!: string;

  @OneToOne(() => User, { hidden: true })
  user!: Rel<User>;

  @ManyToOne(() => Role)
  role!: Rel<Role>;

  @OneToOne(() => Account, { nullable: true, mappedBy: (account) => account.userProfile })
  account?: Rel<Account>;
}
