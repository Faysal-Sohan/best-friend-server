import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from "@mikro-orm/core";

import { TransactionsRepository } from "@/modules/transactions/transactions.repository";

import { EPaymentMethod, ETransactionType } from "../enums/transactions.enums";
import { Account } from "./accounts.entity";
import { CustomBaseEntity } from "./custom-base.entity";


@Entity({ tableName: "transactions", repository: () => TransactionsRepository })
export class Transaction extends CustomBaseEntity {
  [EntityRepositoryType]?: TransactionsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  amount!: number;

  @Property({ fieldName: "deduction_amount" })
  deductionAmount!: number;

  @Property({ fieldName: "bank_trx_id", nullable: true })
  bankTrxId!: string;

  @Enum({ items: () => ETransactionType, fieldName: "transaction_type" })
  transactionType!: ETransactionType;

  @Enum({ items: () => EPaymentMethod, fieldName: "payment_method" })
  paymentMethod!: EPaymentMethod;

  @ManyToOne(() => Account, { fieldName: "paid_to" })
  paidTo!: Rel<Account>;

  @ManyToOne(() => Account, { fieldName: "paid_by" })
  paidBy!: Rel<Account>;
}
