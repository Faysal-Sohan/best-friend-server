import { BadRequestException, Injectable } from "@nestjs/common";

import { wrap } from "@mikro-orm/core";

import { Account } from "@/common/entities/accounts.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { UserProfilesRepository } from "../user-profiles/user-profiles.repository";
import { AccountDto } from "./accounts.dtos";
import { AccountsRepository } from "./accounts.repository";

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepsoitory: AccountsRepository,
    private readonly userProfilesRepository: UserProfilesRepository,
  ) {}

  async createAccount(userProfileId: number, body: AccountDto) {
    const userProfile = await this.userProfilesRepository
      .getEntityManager()
      .findOneOrFail(UserProfile, { id: userProfileId });

    if (!userProfile) {
      throw new BadRequestException("User profile doesn't exist");
    }

    const account = this.accountsRepsoitory
      .getEntityManager()
      .create(Account, { ...body, userProfile });

    await this.accountsRepsoitory.getEntityManager().persistAndFlush(userProfile);

    return account;
  }

  async updateAccount(userProfileId: number, accountId: number, body: Partial<AccountDto>) {
    const account = await this.accountsRepsoitory
      .getEntityManager()
      .findOneOrFail(Account, { id: accountId, userProfile: userProfileId });

    wrap(account).assign(body);

    await this.accountsRepsoitory.getEntityManager().persistAndFlush(account);

    return account;
  }
}
