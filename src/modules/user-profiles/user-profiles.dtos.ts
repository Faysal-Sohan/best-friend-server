import { PartialType } from "@nestjs/swagger";

import { IsString, MinLength, MaxLength, IsOptional, IsObject } from "class-validator";

import { AccountDto } from "../accounts/accounts.dtos";
import { RoleResponse } from "../roles/roles.dtos";

export class UserProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  address!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  thana!: string;

  @IsString()
  district!: string;

  @IsString()
  nid!: string;
}

export class SelfRegisterUserProfileDto extends UserProfileDto {}

export class UpdateUserProfileDto extends PartialType(UserProfileDto) {
  @IsOptional()
  @IsObject()
  account?: AccountDto;
}

export class UserProfileResponse {
  id!: number;
  createdAt!: string;
  updatedAt!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: RoleResponse;
  account?: AccountDto;
}
