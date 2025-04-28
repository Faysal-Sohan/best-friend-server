import { Account } from "@/common/entities/accounts.entity";
import { CustomSQLBaseRepository } from "@/common/repository/custom-sql-base.repository";

export class AccountsRepository extends CustomSQLBaseRepository<Account> {}
