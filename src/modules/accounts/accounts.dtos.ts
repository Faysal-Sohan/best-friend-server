import { OmitType } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { Account } from "@/common/entities/accounts.entity";

export class AccountDto extends OmitType(Account, ["id"]) {
  @IsString()
  accountHolderName!: string;

  @IsString()
  accountNumber!: string;

  @IsString()
  postCode!: string;

  @IsString()
  cvv!: string;
}
