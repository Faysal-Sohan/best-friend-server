import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { ITokenizedUser } from "../auth/auth.interfaces";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AccountDto } from "./accounts.dtos";
import { AccountsService } from "./accounts.service";

@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller("users/accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  addAccount(@CurrentUser() user: ITokenizedUser, @Body() body: AccountDto) {
    return this.accountsService.createAccount(user.userProfileId, body);
  }

  @Patch(":accountId")
  updateAccount(
    @Param("accountId", ParseIntPipe) accountId: number,
    @CurrentUser() user: ITokenizedUser,
    @Body() body: Partial<AccountDto>,
  ) {
    return this.accountsService.updateAccount(user.userProfileId, accountId, body);
  }
}
