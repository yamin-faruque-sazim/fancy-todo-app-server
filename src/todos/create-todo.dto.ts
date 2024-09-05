import { ETodoPriority } from 'src/common/enums/todo-priority.enum';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsEnum(ETodoPriority)
  priority: ETodoPriority;

  isCompleted: boolean;
}
