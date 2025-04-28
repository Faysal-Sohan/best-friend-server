import { Migration } from '@mikro-orm/migrations';

export class Migration20241215045229_add_relation extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_profiles" add column "account_id" int null;');
    this.addSql('alter table "user_profiles" add constraint "user_profiles_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_profiles" add constraint "user_profiles_account_id_unique" unique ("account_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_profiles" drop constraint "user_profiles_account_id_foreign";');

    this.addSql('alter table "user_profiles" drop constraint "user_profiles_account_id_unique";');
    this.addSql('alter table "user_profiles" drop column "account_id";');
  }

}
