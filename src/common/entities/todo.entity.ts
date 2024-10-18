import {
  DateTimeType,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { ETodoPriority } from '../enums/todo-priority.enum';
import { TodoRepository } from '../../todos/todos.repository';

@Entity({ tableName: 'todo', repository: () => TodoRepository })
export class Todo {
  [EntityRepositoryType]?: TodoRepository;

  @PrimaryKey({ type: 'uuid', fieldName: 'id' })
  id: string = uuidv4();

  @Property({ fieldName: 'title' })
  title!: string;

  @Property({ type: 'text', fieldName: 'description' })
  description!: string;

  @Property({ default: false, fieldName: 'is_completed' })
  isCompleted: boolean = false;

  @Enum({ items: () => ETodoPriority, fieldName: 'priority' })
  priority!: ETodoPriority;

  @Property({ type: DateTimeType, fieldName: 'dueDate' })
  dueDate!: Date;

  @Property({
    type: DateTimeType,
    fieldName: 'created_at',
    onCreate: () => new Date(),
  })
  createdAt?: Date = new Date(); 
}
