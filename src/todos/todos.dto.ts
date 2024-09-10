import { ETodoPriority } from '@/common/enums/todo-priority.enum';

import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'Due date is required.' })
  @IsDateString({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Use YYYY-MM-DD.',
  })
  dueDate!: Date;

  @IsNotEmpty()
  @IsEnum(ETodoPriority)
  priority!: ETodoPriority;

  isCompleted: boolean = false;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format. Use YYYY-MM-DD.',
  })
  dueDate?: Date;

  @IsOptional()
  @IsEnum(ETodoPriority)
  priority?: ETodoPriority;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
