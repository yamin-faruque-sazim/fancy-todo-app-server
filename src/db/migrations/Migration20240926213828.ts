import { Migration } from '@mikro-orm/migrations';

export class Migration20240926213828 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" alter column "due_date" type timestamptz using ("due_date"::timestamptz);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" alter column "due_date" type date using ("due_date"::date);');
  }

}
