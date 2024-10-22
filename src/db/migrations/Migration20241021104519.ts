import { Migration } from '@mikro-orm/migrations';

export class Migration20241021104519 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" drop constraint if exists "todo_priority_check";');

    this.addSql('alter table "todo" alter column "priority" type smallint using ("priority"::smallint);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint if exists "todo_priority_check";');

    this.addSql('alter table "todo" alter column "priority" type text using ("priority"::text);');
    this.addSql('alter table "todo" add constraint "todo_priority_check" check("priority" in (\'HIGH\', \'MEDIUM\', \'LOW\'));');
  }

}
