import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Todo {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ default: false })
  isCompleted: boolean = false;
}
