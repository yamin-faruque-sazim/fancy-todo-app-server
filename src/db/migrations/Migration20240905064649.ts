import { Migration } from '@mikro-orm/migrations';

export class Migration20240905064649 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" drop constraint if exists "todo_priority_check";');

    this.addSql('alter table "todo" alter column "priority" type varchar(255) using ("priority"::varchar(255));');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" alter column "priority" type text using ("priority"::text);');
    this.addSql('alter table "todo" add constraint "todo_priority_check" check("priority" in (\'HIGH\', \'MEDIUM\', \'LOW\'));');
  }

}
