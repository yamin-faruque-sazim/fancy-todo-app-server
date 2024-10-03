import { Migration } from '@mikro-orm/migrations';

export class Migration20241003101809 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" add column "created_at" timestamptz not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" drop column "created_at";');
  }

}
