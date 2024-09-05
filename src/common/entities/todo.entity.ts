import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { ETodoPriority } from '../enums/todo-priority.enum';
import { TodoRepository } from '../../todos/todos.repository';

@Entity({ repository: () => TodoRepository })
export class Todo {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ default: false })
  isCompleted: boolean = false;

  @Enum({ items: () => ETodoPriority })
  priority!: ETodoPriority;

  @Property({ type: 'date' })
  dueDate!: Date;
}
