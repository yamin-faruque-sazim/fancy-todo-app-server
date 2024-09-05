import { Migration } from '@mikro-orm/migrations';

export class Migration20240905064856 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" drop column "priority";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" add column "priority" varchar(255) not null;');
  }

}
