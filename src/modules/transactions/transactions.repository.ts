import { Transaction } from "@/common/entities/transactions.entity";
import { CustomSQLBaseRepository } from "@/common/repository/custom-sql-base.repository";

export class TransactionsRepository extends CustomSQLBaseRepository<Transaction> {}
