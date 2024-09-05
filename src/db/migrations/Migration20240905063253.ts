import { Migration } from '@mikro-orm/migrations';

export class Migration20240905063253 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" alter column "description" type text using ("description"::text);');
    this.addSql('alter table "todo" alter column "description" set not null;');
    this.addSql('alter table "todo" alter column "due_date" type date using ("due_date"::date);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "todo" alter column "description" drop not null;');
    this.addSql('alter table "todo" alter column "due_date" type timestamptz using ("due_date"::timestamptz);');
  }

}
