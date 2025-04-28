import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Account } from "@/common/entities/accounts.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";

@Module({
  imports: [MikroOrmModule.forFeature([Account, UserProfile])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
