import { Migration } from '@mikro-orm/migrations';

export class Migration20240904172648 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "todo" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) null, "is_completed" boolean not null default false, constraint "todo_pkey" primary key ("id"));',
    );
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "todo" cascade;');
  }
}
