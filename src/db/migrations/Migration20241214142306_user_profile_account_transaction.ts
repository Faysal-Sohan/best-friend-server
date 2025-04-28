import { Migration } from "@mikro-orm/migrations";

export class Migration20241214142306_user_profile_account_transaction extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "accounts" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "account_holder_name" varchar(255) null, "account_number" varchar(255) null, "bank_name" varchar(255) null, "cvv" varchar(255) null, "post_code" varchar(255) null, "user_profile_id" int not null);',
    );
    this.addSql(
      'alter table "accounts" add constraint "accounts_user_profile_id_unique" unique ("user_profile_id");',
    );

    this.addSql(
      'create table "transactions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "amount" int not null, "deduction_amount" int not null, "bank_trx_id" varchar(255) null, "transaction_type" text check ("transaction_type" in (\'monthly_deposit\', \'investment\')) not null, "payment_method" text check ("payment_method" in (\'bkash\', \'rocket\', \'nogod\', \'debit_or_credit_card\')) not null, "paid_to" int not null, "paid_by" int not null);',
    );

    this.addSql(
      'alter table "accounts" add constraint "accounts_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profiles" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "transactions" add constraint "transactions_paid_to_foreign" foreign key ("paid_to") references "accounts" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "transactions" add constraint "transactions_paid_by_foreign" foreign key ("paid_by") references "accounts" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user_profiles" add column "phone_number" varchar(255) not null, add column "address" varchar(255) not null, add column "thana" varchar(255) not null, add column "district" varchar(255) not null, add column "nid" varchar(255) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_paid_to_foreign";');

    this.addSql('alter table "transactions" drop constraint "transactions_paid_by_foreign";');

    this.addSql('drop table if exists "accounts" cascade;');

    this.addSql('drop table if exists "transactions" cascade;');

    this.addSql(
      'alter table "user_profiles" drop column "phone_number", drop column "address", drop column "thana", drop column "district", drop column "nid";',
    );
  }
}
