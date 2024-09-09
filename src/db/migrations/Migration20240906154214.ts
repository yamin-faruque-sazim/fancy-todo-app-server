import { Migration } from '@mikro-orm/migrations';

export class Migration20240906154214 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "todo" ("id" uuid not null, "title" varchar(255) not null, "description" text not null, "is_completed" boolean not null default false, "priority" text check ("priority" in (\'HIGH\', \'MEDIUM\', \'LOW\')) not null, "due_date" date not null, constraint "todo_pkey" primary key ("id"));',
    );
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "todo" cascade;');
  }
}
