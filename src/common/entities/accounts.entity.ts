import { Entity, EntityRepositoryType, OneToOne, PrimaryKey, Property, Rel } from "@mikro-orm/core";

import { AccountsRepository } from "@/modules/accounts/accounts.repository";

import { CustomBaseEntity } from "./custom-base.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({ tableName: "accounts", repository: () => AccountsRepository })
export class Account extends CustomBaseEntity {
  [EntityRepositoryType]?: AccountsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: "account_holder_name", nullable: true })
  accountHolderName!: string;

  @Property({ fieldName: "account_number", nullable: true })
  accountNumber!: string;

  @Property({ fieldName: "bank_name", nullable: true })
  bankName!: string;

  @Property({ nullable: true })
  cvv!: string;

  @Property({ fieldName: "post_code", nullable: true })
  postCode!: string;

  @OneToOne(() => UserProfile)
  userProfile!: Rel<UserProfile>;
}
