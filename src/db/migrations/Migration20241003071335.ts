import { Migration } from '@mikro-orm/migrations';

export class Migration20241003071335 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "todo" rename column "due_date" to "dueDate";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "todo" rename column "dueDate" to "due_date";');
  }

}
