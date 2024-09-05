import { Migration } from '@mikro-orm/migrations';

export class Migration20240904185603 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" add column "priority" text check ("priority" in (\'HIGH\', \'MEDIUM\', \'LOW\')) not null, add column "due_date" timestamptz not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" drop column "priority", drop column "due_date";');
  }

}
