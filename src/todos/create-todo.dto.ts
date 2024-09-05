import { ETodoPriority } from 'src/common/enums/todo-priority.enum';

export class CreateTodoDto {
  title: string;
  description: string;
  dueDate: Date;
  priority: ETodoPriority;
  isCompleted: boolean;
}
